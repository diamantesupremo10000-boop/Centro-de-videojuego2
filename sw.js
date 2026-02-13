const CACHE_NAME = 'arcade-hub-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
  // Si tienes iconos, agrégalos aquí: './icon-192.png'
];

// 1. Instalación: Cachear recursos estáticos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Cacheando archivos');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activación: Limpiar cachés viejas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// 3. Intercepción de peticiones (Modo Offline)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Si está en caché, devuélvelo. Si no, búscalo en la red.
      return response || fetch(e.request);
    })
  );
});
