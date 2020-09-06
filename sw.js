let name = 'v1';
let files = [
    './main.html',
    './code_js.js',
    './styles.css',
    './'
];

self.addEventListener('install', function(event) {

    caches.open(name).
        then(function(cache) {
            cache.addAll(files)
        })

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