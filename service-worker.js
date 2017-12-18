const cacheVerison = "0";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheVerison).then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./dist/index.js",
        "./dist/index.css",
        "./static/browserconfig.xml",
        "./static/favicon-16x16.png",
        "./static/android-chrome-192x192.png",
        "./static/android-chrome-512x512.png",
        "./static/apple-touch-icon.png",
        "./static/manifest.json",
        "./static/favicon-32x32.png",
        "./static/favicon.ico",
        "./static/mstile-144x144.png",
        "./static/mstile-150x150.png",
        "./static/mstile-310x150.png",
        "./static/mstile-310x310.png",
        "./static/mstile-70x70.png",
        "./static/safari-pinned-tab.svg",
        "./static/favicon.ico.svg"
      ]);
    })
  );

  event.waitUntil(self.skipWaiting());
});

if (location.hostname !== "localhost") {
  self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        } else {
          // Miss - fetch over network
          return fetch(event.request);
        }
      })
    );
  });
}

self.addEventListener("activate", event => {
  const cacheWhitelist = [cacheVerison];

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  event.waitUntil(self.clients.claim());
});
