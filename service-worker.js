/* =========================================
   JOHAR SCRIPT STUDIO
   SERVICE WORKER
   Offline + Cache + Auto Update
   ========================================= */

const CACHE_NAME = "johar-script-studio-v3";

// =========================================
// IMPORTANT FILES
// =========================================

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",

    // CSS
    "./css/style.css",

    // JavaScript
    "./js/script.js",
    "./js/keyboard.js",
    "./js/pad.js",
    "./js/translate.js",
    "./js/ui.js",

    // Images
    "./assets/logo/icon-192.png",
    "./assets/logo/icon-512.png",
    "./assets/logo/logo.png",

    // Fonts
    "./fonts/GunjalaGondi-Regular.ttf",
    "./fonts/MasaramGondi-Regular.ttf"
];


// =========================================
// INSTALL
// =========================================

self.addEventListener("install", event => {

    console.log("Johar Script Studio SW installing...");

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(async cache => {

                // Har file individually cache hogi
                // Ek file fail hone se pura cache fail nahi hoga
                await Promise.allSettled(

                    FILES_TO_CACHE.map(async file => {

                        try {

                            const response = await fetch(file);

                            if (response.ok) {

                                await cache.put(file, response);

                                console.log("Cached:", file);

                            } else {

                                console.warn(
                                    "Could not cache:",
                                    file,
                                    response.status
                                );

                            }

                        } catch (error) {

                            console.warn(
                                "Failed to cache:",
                                file
                            );

                        }

                    })

                );

            })

            .then(() => self.skipWaiting())

    );

});


// =========================================
// ACTIVATE
// =========================================

self.addEventListener("activate", event => {

    console.log("Johar Script Studio SW activated!");

    event.waitUntil(

        caches.keys()
            .then(cacheNames => {

                return Promise.all(

                    cacheNames
                        .filter(name => name !== CACHE_NAME)
                        .map(name => caches.delete(name))

                );

            })

            .then(() => self.clients.claim())

    );

});


// =========================================
// FETCH
// =========================================

self.addEventListener("fetch", event => {

    // Sirf GET requests
    if (event.request.method !== "GET") return;


    // =====================================
    // PAGE NAVIGATION
    // =====================================

    if (event.request.mode === "navigate") {

        event.respondWith(

            fetch(event.request)

                .then(response => {

                    // Latest page ko cache karo
                    const clone = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {

                            cache.put(
                                "./index.html",
                                clone
                            );

                        });

                    return response;

                })

                .catch(() => {

                    // Internet OFF → cached website
                    return caches.match("./index.html")

                        .then(response => {

                            return response ||
                                caches.match("./");

                        });

                })

        );

        return;

    }


    // =====================================
    // CACHE FIRST
    // =====================================

    event.respondWith(

        caches.match(event.request)

            .then(cachedResponse => {

                // Cache available
                if (cachedResponse) {

                    // Background update
                    fetch(event.request)

                        .then(networkResponse => {

                            if (
                                networkResponse &&
                                networkResponse.ok
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

                        .catch(() => {});

                    return cachedResponse;

                }


                // =====================================
                // NOT IN CACHE → NETWORK
                // =====================================

                return fetch(event.request)

                    .then(networkResponse => {

                        if (
                            networkResponse &&
                            networkResponse.ok
                        ) {

                            const clone =
                                networkResponse.clone();

                            caches.open(CACHE_NAME)

                                .then(cache => {

                                    cache.put(
                                        event.request,
                                        clone
                                    );

                                });

                        }

                        return networkResponse;

                    })

                    .catch(() => {

                        // Offline and file unavailable
                        return new Response(
                            "Offline - File not available",
                            {
                                status: 503,
                                statusText: "Offline"
                            }
                        );

                    });

            })

    );

});
