/*
 * Elchí Studio Bali service worker — lean offline story.
 * - Navigations: network-first with cache copy + offline fallback.
 * - Static assets (/_next/static, /icons, /og.jpg): cache-first.
 */
const CACHE = "elchi-v1";
const OFFLINE = "/offline.html";
const STATIC_PATTERNS = ["/_next/static", "/icons/", "/og.jpg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll([OFFLINE])).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Pages: network-first, fall back to cache then the offline page.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((m) => m || caches.match(OFFLINE)))
    );
    return;
  }

  // Immutable static assets: cache-first.
  if (STATIC_PATTERNS.some((p) => url.pathname.startsWith(p))) {
    event.respondWith(
      caches.match(req).then(
        (m) =>
          m ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
            return res;
          })
      )
    );
  }
});
