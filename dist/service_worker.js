var cacheName = 'js2kakudori-v1.20220720';
var appFiles = [
	'/',
	'/index.html',
	'/main.js',
	'/2kakudori.css',
	'/favicon.ico',
	'/images/bg.jpg',
	'/images/gameover1.png',
	'/images/gameover2.png',
	'/images/gameover3.png',
	'/images/gameover4.png',
	'/images/hint.png',
	'/images/redball.png',
	'/images/reset.png',
	'/images/shuffle.png',
	'/images/tile/j1.png',
	'/images/tile/j2.png',
	'/images/tile/j3.png',
	'/images/tile/j4.png',
	'/images/tile/j5.png',
	'/images/tile/j6.png',
	'/images/tile/j7.png',
	'/images/tile/m1.png',
	'/images/tile/m2.png',
	'/images/tile/m3.png',
	'/images/tile/m4.png',
	'/images/tile/m5.png',
	'/images/tile/m6.png',
	'/images/tile/m7.png',
	'/images/tile/m8.png',
	'/images/tile/m9.png',
	'/images/tile/p1.png',
	'/images/tile/p2.png',
	'/images/tile/p3.png',
	'/images/tile/p4.png',
	'/images/tile/p5.png',
	'/images/tile/p6.png',
	'/images/tile/p7.png',
	'/images/tile/p8.png',
	'/images/tile/p9.png',
	'/images/tile/s1.png',
	'/images/tile/s2.png',
	'/images/tile/s3.png',
	'/images/tile/s4.png',
	'/images/tile/s5.png',
	'/images/tile/s6.png',
	'/images/tile/s7.png',
	'/images/tile/s8.png',
	'/images/tile/s9.png',
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