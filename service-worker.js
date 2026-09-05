/* =========================================
   JOHAR SCRIPT STUDIO
   SERVICE WORKER
   Cache + Auto Update
   ========================================= */

const CACHE_NAME = "johar-script-studio-v1";

// Website ke important files
const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json"
];


// =========================================
// INSTALL
// =========================================

self.addEventListener("install", event => {
    console.log("Johar Script Studio Service Worker installing...");

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(FILES_TO_CACHE);
            })
            .then(() => {
                // New SW ko immediately activate karne ke liye
                return self.skipWaiting();
            })
    );
});


// =========================================
// ACTIVATE
// =========================================

self.addEventListener("activate", event => {

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {

                return Promise.all(
                    cacheNames
                        .filter(cacheName => cacheName !== CACHE_NAME)
                        .map(cacheName => caches.delete(cacheName))
                );

            })
            .then(() => self.clients.claim())
    );

    console.log("Johar Script Studio Service Worker activated.");
});


// =========================================
// FETCH
// =========================================

self.addEventListener("fetch", event => {

    // Sirf GET requests handle karo
    if (event.request.method !== "GET") return;

    event.respondWith(

        caches.match(event.request)
            .then(cachedResponse => {

                // Cache available hai → pehle cached version do
                if (cachedResponse) {

                    // Background me latest version check karo
                    fetch(event.request)
                        .then(networkResponse => {

                            if (
                                networkResponse &&
                                networkResponse.status === 200 &&
                                networkResponse.type === "basic"
                            ) {
                                caches.open(CACHE_NAME)
                                    .then(cache => {
                                        cache.put(
                                            event.request,
                                            networkResponse.clone()
                                        );
                                    });
                            }

                        })
                        .catch(() => {
                            // Internet nahi hai → cached version use hota rahega
                        });

                    return cachedResponse;
                }


                // Cache me nahi hai → network se lao
                return fetch(event.request)
                    .then(networkResponse => {

                        if (
                            networkResponse &&
                            networkResponse.status === 200 &&
                            networkResponse.type === "basic"
                        ) {
                            const responseClone = networkResponse.clone();

                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(
                                        event.request,
                                        responseClone
                                    );
                                });
                        }

                        return networkResponse;
                    });

            })

    );

});
