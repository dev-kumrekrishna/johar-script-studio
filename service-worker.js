/* =========================================
   JOHAR SCRIPT STUDIO
   SERVICE WORKER
   No Cache / No Offline Storage
   ========================================= */

self.addEventListener("install", () => {
    console.log("Johar Script Studio Service Worker installed.");
});

self.addEventListener("activate", event => {
    event.waitUntil(
        self.clients.claim()
    );
});