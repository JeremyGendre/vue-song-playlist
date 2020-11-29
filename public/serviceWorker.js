self.addEventListener('install', event =>  {
    const preCache = async () => {
        const cache = await caches.open('static');
        return cache.addAll([
            '/images/background.jpg',
            '/images/default_song.png',
            '/images/profile.jpg',
            'icon-192x192.png',
            'icon-256x256.png',
            'icon-384x384.png',
            'icon-512x512.png',
        ]);
    };

    event.waitUntil(preCache());
});


self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['static'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            console.log(response);
            return response || fetch(event.request);
        })
    );
});
