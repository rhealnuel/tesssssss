const CACHE_NAME = "my-react-app-cache-v1";
const urlsToCache = ["/", "/index.html"];

// Install event: Cache files
self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching files");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: Serve from cache when offline
self.addEventListener("fetch", (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener("activate", (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Service Worker: Clearing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Export a function to register the service worker
export default function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then((reg) => console.log("Service Worker registered:", reg))
        .catch((err) => console.log("Service Worker registration failed:", err));
    });
  }
}
