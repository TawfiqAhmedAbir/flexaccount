const CACHE = "flexaccount-v2";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(["/", "/index.html", "/manifest.json"]))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

function isAppShell(url) {
  return (
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".html") ||
    url.pathname === "/" ||
    url.pathname.endsWith("/")
  );
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    (async () => {
      const url = new URL(event.request.url);
      if (isAppShell(url)) {
        try {
          const res = await fetch(event.request);
          if (res.ok) {
            const copy = res.clone();
            const cache = await caches.open(CACHE);
            await cache.put(event.request, copy);
          }
          return res;
        } catch {
          return caches.match(event.request);
        }
      }
      const cached = await caches.match(event.request);
      if (cached) return cached;
      return fetch(event.request);
    })()
  );
});
