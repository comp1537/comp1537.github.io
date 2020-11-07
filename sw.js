let name = 'v1';
let files = [
    './main.html',
    './code_js.js',
    './styles.css',
    './'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(name).
            then(function(cache) {
                return cache.addAll(files);
            }).
            then(function() {
                // simply makes the new service worker the active one
                // I won't need to wait for the old worker (if any) to handle the fetches
                return self.skipWaiting();
            })
    );
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(match){
                if(match) {
                    return match;
                } else {
                    return fetch(event.request)
                        .then(function(response) {
                            return caches.open(name).
                                then(function(cache) {
                                        cache.put(event.request, response.clone())
                                        return response;
                                 })
                        })
                }
            })
    );
});
