var cacheName = 'js2kakudori-v1';
var appFiles = [
	'/js2kakudori/',
	'/js2kakudori/index.html',
	'/js2kakudori/main.js',
	'/js2kakudori/2kakudori.css',
	'/js2kakudori/favicon.ico',
	'/js2kakudori/images/bg.jpg',
	'/js2kakudori/images/gameover1.png',
	'/js2kakudori/images/gameover2.png',
	'/js2kakudori/images/gameover3.png',
	'/js2kakudori/images/gameover4.png',
	'/js2kakudori/images/hint.png',
	'/js2kakudori/images/redball.png',
	'/js2kakudori/images/reset.png',
	'/js2kakudori/images/shuffle.png',
	'/js2kakudori/images/tile/j1.png',
	'/js2kakudori/images/tile/j2.png',
	'/js2kakudori/images/tile/j3.png',
	'/js2kakudori/images/tile/j4.png',
	'/js2kakudori/images/tile/j5.png',
	'/js2kakudori/images/tile/j6.png',
	'/js2kakudori/images/tile/j7.png',
	'/js2kakudori/images/tile/m1.png',
	'/js2kakudori/images/tile/m2.png',
	'/js2kakudori/images/tile/m3.png',
	'/js2kakudori/images/tile/m4.png',
	'/js2kakudori/images/tile/m5.png',
	'/js2kakudori/images/tile/m6.png',
	'/js2kakudori/images/tile/m7.png',
	'/js2kakudori/images/tile/m8.png',
	'/js2kakudori/images/tile/m9.png',
	'/js2kakudori/images/tile/p1.png',
	'/js2kakudori/images/tile/p2.png',
	'/js2kakudori/images/tile/p3.png',
	'/js2kakudori/images/tile/p4.png',
	'/js2kakudori/images/tile/p5.png',
	'/js2kakudori/images/tile/p6.png',
	'/js2kakudori/images/tile/p7.png',
	'/js2kakudori/images/tile/p8.png',
	'/js2kakudori/images/tile/p9.png',
	'/js2kakudori/images/tile/s1.png',
	'/js2kakudori/images/tile/s2.png',
	'/js2kakudori/images/tile/s3.png',
	'/js2kakudori/images/tile/s4.png',
	'/js2kakudori/images/tile/s5.png',
	'/js2kakudori/images/tile/s6.png',
	'/js2kakudori/images/tile/s7.png',
	'/js2kakudori/images/tile/s8.png',
	'/js2kakudori/images/tile/s9.png',
];

self.addEventListener('install', e => {
	console.log('[ServiceWorker] Install');
	e.waitUntil(
		caches.open(cacheName).then(cache => {
			console.log('[Service Worker] Caching all: app shell and content');
			return cache.addAll(appFiles);
		})
	);
});

self.addEventListener('activate', e => {
	console.log('[ServiceWorker] Activate');
	e.waitUntil(
		caches.keys().then(keyList => {
			return Promise.all(keyList.map(key => {
				if (key !== cacheName)
					return caches.delete(key);
			}));
		})
	);
});

self.addEventListener('fetch', e => {
	e.respondWith(
		caches.match(e.request).then(r => {
			console.log('[Service Worker] Fetching resource: ' + e.request.url);
			return r || fetch(e.request).then(response => {
				return caches.open(cacheName).then(cache => {
					console.log('[Service Worker] Caching new resource: ' + e.request.url);
					cache.put(e.request, response.clone());
					return response;
				});
			});
		})
	);
});