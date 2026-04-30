// api/relay.js   ← این فایل را در پوشه api/relay.js قرار بده

const TARGET_BASE = (process.env.TARGET_DOMAIN || "").replace(/\/+$/, "");

const STRIP_HEADERS = new Set([
  "host", "connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
  "te", "trailer", "transfer-encoding", "upgrade", "forwarded",
  "x-forwarded-host", "x-forwarded-proto", "x-forwarded-port"
]);

const NF_HEADERS = ["x-nf-", "x-netlify-"];

const decode = (s) => s.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ 13)).join('');

const rateLimit = (() => {
  const store = new Map();
  return (ip, limit = 7, windowMs = 60000) => {
    const now = Date.now();
    if (!store.has(ip)) store.set(ip, []);
    let logs = store.get(ip).filter(t => now - t < windowMs);
    if (logs.length >= limit) return true;
    logs.push(now);
    store.set(ip, logs);
    return false;
  };
})();

export default async function handler(req) {
  if (!TARGET_BASE) {
    return new Response("TARGET_DOMAIN is not configured", { status: 500 });
  }

  try {
    const url = new URL(req.url);
    
    // محدود کردن مسیر (توصیه اکید)
    if (!url.pathname.startsWith('/api/relay/')) {
      return new Response(decode("Pq{\"Pqwpf"), { status: 404 });
    }

    const targetUrl = TARGET_BASE + url.pathname.replace('/api/relay', '') + url.search;

    const headers = new Headers();
    let clientIp = null;

    for (const [key, value] of req.headers) {
      const k = key.toLowerCase().trim();
      if (STRIP_HEADERS.has(k)) continue;
      if (NF_HEADERS.some(p => k.startsWith(p))) continue;

      if (k === "x-real-ip") {
        clientIp = value;
        continue;
      }
      if (k === "x-forwarded-for") {
        if (!clientIp) clientIp = value.split(',')[0].trim();
        continue;
      }
      headers.set(k, value);
    }

    if (clientIp) headers.set("x-forwarded-for", clientIp);

    const clientIpForRate = (clientIp  req.headers.get("x-real-ip")  "unknown").split(',')[0].trim();

    if (rateLimit(clientIpForRate)) {
      return new Response(decode("Vqq\"Oc{\"Rgeqwv"), { status: 429 });
    }

    const fetchOpts = {
      method: req.method,
      headers,
      redirect: "manual",
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
      fetchOpts.body = req.body;
    }

    const upstream = await fetch(targetUrl, fetchOpts);

    const respHeaders = new Headers();
    for (const [k, v] of upstream.headers) {
      if (k.toLowerCase() === "transfer-encoding") continue;
      respHeaders.set(k, v);
    }

    return new Response(upstream.body, {
      status: upstream.status,
      headers: respHeaders,
    });

  } catch (err) {
    console.error("Relay error:", err);
    return new Response("Bad Gateway", { status: 502 });
  }
}
