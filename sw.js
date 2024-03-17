const cacheName = 'emotion-matching-game';

// Install event handler (caches static assets)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        // Replace these with your actual resource URLs
        const urlsToCache = [
          '/',
          './index.html',
          './style.css',
          './script.js',
          './smileys-512x512.png', // This is your favicon image
          './images/angry/*.+(png|jpg|jpeg|gif)', // Dynamic globbing for images
          './images/disgust/*.+(png|jpg|jpeg|gif)', // Dynamic globbing for images
          './images/fear/*.+(png|jpg|jpeg|gif)', // Dynamic globbing for images
          './images/happy/*.+(png|jpg|jpeg|gif)', // Dynamic globbing for images
          './images/neutral/*.+(png|jpg|jpeg|gif)', // Dynamic globbing for images
          './images/sad/*.+(png|jpg|jpeg|gif)', // Dynamic globbing for images
          './images/suprise/*.+(png|jpg|jpeg|gif)', // Dynamic globbing for images
          
          // Add other essential game assets (images, sounds) for offline play
        ];
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event handler (serves cached resources if available)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});