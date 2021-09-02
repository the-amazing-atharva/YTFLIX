//Progressive Web App
const staticLoader = "YTFLIX"
const assets = [
  "/",
  "index.html",
  "Assets/Icons/maskable_icon_x512.webp",
  "Assets/Icons/maskable_icon_x512.webp"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticLoader).then(cache => {
      cache.addAll(assets)
    })
  )
})
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}