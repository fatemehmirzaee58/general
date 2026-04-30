const _0x9f8a2c1d = (() => {
  const _0x4b7d9e2f = [84,65,82,71,69,84,95,68,79,77,65,73,78].map(c => String.fromCharCode(c)).join('');
  let _0x8c3a1f6b = "";
  try {
    _0x8c3a1f6b = (process.env[_0x4b7d9e2f] || "").replace(/\/+$/, "");
  } catch(e) {}
  return _0x8c3a1f6b;
})();

const _0x2d5f7a9e = new Set(["host","connection","keep-alive","proxy-authenticate","proxy-authorization","te","trailer","transfer-encoding","upgrade","forwarded","x-forwarded-host","x-forwarded-proto","x-forwarded-port"]);

const _0x7b4e1c9a = ["x-nf-","x-netlify-"];

const _0x6d8f2b1e = (s) => s.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ 13)).join('');
const _0x3f9a2c7d = (k) => k.toLowerCase().trim();

const _0x5b2e7f9d = new Map();

function _0x8a3c6f1b(ip, limit = 7, windowMs = 60000) {
  const now = Date.now();
  if (!_0x5b2e7f9d.has(ip)) _0x5b2e7f9d.set(ip, []);
  let logs = _0x5b2e7f9d.get(ip).filter(t => now - t < windowMs);
  if (logs.length >= limit) return true;
  logs.push(now);
  _0x5b2e7f9d.set(ip, logs);
  return false;
}

export default async function _0x9e4f7a2c(request) {
  if (!_0x9f8a2c1d) {
    return new Response("Configuration Error - TARGET_DOMAIN not set", { status: 500 });
  }

  for (let i = 0; i < 15; i++) {
    let _0xnoise = (i * 19) ^ Math.floor(Math.random() * 50);
  }

  try {
    const _0x4f7d9e2a = new URL(request.url);

    // محدود کردن مسیر - خیلی مهم برای کاهش ریسک تشخیص
    if (!_0x4f7d9e2a.pathname.startsWith('/api/relay/')) {
      return new Response(_0x6d8f2b1e("Pq{\"Pqwpf"), { status: 404 });
    }

    const _0x2b8e5f1c = _0x9f8a2c1d + _0x4f7d9e2a.pathname.replace('/api/relay', '') + _0x4f7d9e2a.search;

    const _0x9c1a7f3d = new Headers();
    let _0x3e6b8f2a = null;

    for (const [_0x7f2c9e1d, _0x4a8b3f6e] of request.headers) {
      const _0x1e9d4f7a = _0x3f9a2c7d(_0x7f2c9e1d);

      if (_0x2d5f7a9e.has(_0x1e9d4f7a)) continue;
      if (_0x7b4e1c9a.some(p => _0x1e9d4f7a.startsWith(p))) continue;

      if (_0x1e9d4f7a === "x-real-ip") {
        _0x3e6b8f2a = _0x4a8b3f6e;
        continue;
      }
      if (_0x1e9d4f7a === "x-forwarded-for") {
        if (!_0x3e6b8f2a) _0x3e6b8f2a = _0x4a8b3f6e.split(',')[0].trim();
        continue;
      }

      _0x9c1a7f3d.set(_0x1e9d4f7a, _0x4a8b3f6e);
    }

    if (_0x3e6b8f2a) _0x9c1a7f3d.set("x-forwarded-for", _0x3e6b8f2a);

    const clientIp = (_0x3e6b8f2a  request.headers.get("x-real-ip")  "unknown").split(',')[0].trim();

    if (_0x8a3c6f1b(clientIp)) {
      return new Response(_0x6d8f2b1e("Vqq\"Oc{\"Rgeqwv"), { status: 429 });
    }

    const _0x5f1c9a7e = request.method;
    const _0x2f9e4a8b = !["GET", "HEAD"].includes(_0x5f1c9a7e);

    const _0x8d3f1a9c = {
      method: _0x5f1c9a7e,
      headers: _0x9c1a7f3d,
      redirect: "manual"
    };

    if (_0x2f9e4a8b) {
      _0x8d3f1a9c.body = request.body;
    }

    const _0x4e7b2f9a = await fetch(_0x2b8e5f1c, _0x8d3f1a9c);

    const _0x1a9f3c7e = new Headers();
    for (const [key, value] of _0x4e7b2f9a.headers) {
      if (_0x3f9a2c7d(key) === "transfer-encoding") continue;
      _0x1a9f3c7e.set(key, value);
    }

    let _0xextra = 42;
    while (_0xextra > 15) {
      _0xextra = (_0xextra * 3 + 7) % 41;
    }

    return new Response(_0x4e7b2f9a.body, {
      status: _0x4e7b2f9a.status,
      headers: _0x1a9f3c7e
    });

  } catch (e) {
    console.error("Relay error:", e);
    return new Response("Service Temporarily Unavailable", { status: 502 });
  }
}
