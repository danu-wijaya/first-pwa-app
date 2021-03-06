const CACHE_NAME = "mallguide";
var urlsToCache = [
  "/",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/favicon.ico",
  "/manifest.json",
  "/index.html",
  "/nav.html",
  "/pages/home.html",
  "/pages/profile.html",
  "/pages/shop.html",
  "/pages/store.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/asset/header.jpg",
  "/asset/mall-guide-logo.png",
  "/asset/shoes1.jpg",
  "/asset/shoes2.jpeg",
  "/asset/shoes3.jpg",
  "/asset/tshirt1.jpg",
  "/asset/tshirt2.jpg",
  "/asset/tshirt3.jpg",
  "/asset/store1.jpg",
  "/asset/store2.jpg",

];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Using asset from cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Load asset from server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
});
  
self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " deleted");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });