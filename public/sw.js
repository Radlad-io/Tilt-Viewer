const staticDevCoffee = "dev-coffee-site-v1";
const assets = ["/", "/index.html"];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Activate!");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      console.log("ServiceWorker returned: ", event.request.url);
      return res || fetch(event.request);
    })
  );
});
