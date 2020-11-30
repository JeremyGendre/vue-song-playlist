self.addEventListener('install', event =>  {
    const preCache = async () => {
        const cache = await caches.open('static');
        return cache.addAll([
            'index.html',
            '/images/background.jpg',
            '/images/default_song.png',
            '/images/profile.jpg',
            'manifest.json',
            'robots.txt',
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

self.addEventListener('fetch',  event => {
    event.respondWith(
        caches.open('dynamic').then(cache => {
            return cache.match(event.request).then(response => {
                console.log(response);
                return response || fetch(event.request).then(response => {
                    if(event.request.method.toLowerCase() === 'get'){
                        cache.put(event.request, response.clone());
                    }
                    return response;
                });
            });
        })
    );
});
