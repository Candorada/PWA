const CACHE_NAME = "math-grapher-cache-v1";
const CACHE_ASSETS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/icon.png"
  ];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(CACHE_ASSETS);
        })
    )
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request) || caches.match("/icon.png"))
    );
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
    );
  });