const CACHE_NAME = 'ab-portfolio-v1';

const SHELL_ASSETS = [
  './',
  'index.html',
  'css/themes.css',
  'css/spa.css',
  'js/pin.js',
  'js/themes.js',
  'js/i18n.js',
  'js/app.js',
  'js/downloads.js',
  'js/editor.js',
  'js/jobs.js',
  'manifest.json'
];

// Install: cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for content/ files, network-first for shell
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Cache first, network fallback for content/ files
  if (url.pathname.includes('/content/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Shell assets: try cache first, fall back to network
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
