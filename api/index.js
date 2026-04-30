export const config = { runtime: "edge" };

const _0x9f8a2c1d = (function () {
    const _0x4b7d9e2f = "TARGET_DOMAIN";
    let _0x8c3a1f6b = process.env[_0x4b7d9e2f] || "";
    return _0x8c3a1f6b.replace(/\/$/, "");
})();

const _0x2d7f9a3c = new Set([
    "host","connection","keep-alive","proxy-authenticate","proxy-authorization",
    "te","trailer","transfer-encoding","upgrade","forwarded",
    "x-forwarded-host","x-forwarded-proto","x-forwarded-port"
]);

const _0x5e1a9d4b = "x-vercel-";
const _0x7c3b8e2a = "x-real-ip";
const _0x9d4f1e8c = "x-forwarded-for";

function _0x3f8a2c7d(_0x1a9e4b7f) {
    const _0x6d9f2e1a = _0x1a9e4b7f.indexOf("/", 8);
    return _0x6d9f2e1a === -1 ? _0x9f8a2c1d + "/" : _0x9f8a2c1d + _0x1a9e4b7f.slice(_0x6d9f2e1a);
}

const _0x8f2a1c9e = (function() {
    const _0x4e7b9d3a = ["Misconfigured: TARGET_DOMAIN is not set", "Bad Gateway: Tunnel Failed"];
    return {
        a: () => new Response(_0x4e7b9d3a[0], { status: 500 }),
        b: () => new Response(_0x4e7b9d3a[1], { status: 502 })
    };
})();

export default async function _0x1b9f7d3e(_0x4c8a2e9f) {
    if (!_0x9f8a2c1d) {
        return _0x8f2a1c9e.a();
    }

    try {
        const _0x7e3d9a2f = _0x3f8a2c7d(_0x4c8a2e9f.url);
        const _0x2b9f1d8a = new Headers();
        let _0x6c4e8f2d = null;

        for (const [_0x9e1f7a3c, _0x5d2b8e9f] of _0x4c8a2e9f.headers) {
            if (_0x2d7f9a3c.has(_0x9e1f7a3c)) continue;
            if (_0x9e1f7a3c.startsWith(_0x5e1a9d4b)) continue;

            if (_0x9e1f7a3c === _0x7c3b8e2a) {
                _0x6c4e8f2d = _0x5d2b8e9f;
                continue;
            }
            if (_0x9e1f7a3c === _0x9d4f1e8c) {
                if (!_0x6c4e8f2d) _0x6c4e8f2d = _0x5d2b8e9f;
                continue;
            }
            _0x2b9f1d8a.set(_0x9e1f7a3c, _0x5d2b8e9f);
        }

        if (_0x6c4e8f2d) _0x2b9f1d8a.set(_0x9d4f1e8c, _0x6c4e8f2d);

        const _0x3a8d7e2c = _0x4c8a2e9f.method;
        const _0x1f9e4d7b = _0x3a8d7e2c !== "GET" && _0x3a8d7e2c !== "HEAD";

        // junk code + string encoding noise
        const _0x9a3f7e2d = "\x66\x65\x74\x63\x68";
        const _0x4d2b9f1e = globalThis[_0x9a3f7e2d];

        return await _0x4d2b9f1e(_0x7e3d9a2f, {
            method: _0x3a8d7e2c,
            headers: _0x2b9f1d8a,
            body: _0x1f9e4d7b ? _0x4c8a2e9f.body : undefined,
            duplex: "half",
            redirect: "manual"
        });
    } catch (_0x8e2f9a7d) {
        console.error("\x72\x65\x6c\x61\x79\x20\x65\x72\x72\x6f\x72\x3a", _0x8e2f9a7d);
        return _0x8f2a1c9e.b();
    }
}
