const CACHE_NAME = 'smartview-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/smartview-pro-logo-2.png',
  // Brand logos
  '/assets/brands/samsung.webp',
  '/assets/brands/LG.webp',
  '/assets/brands/sony.webp',
  '/assets/brands/TCL.webp',
  '/assets/brands/Hisense.webp',
  // Hero images
  '/assets/hero-image.webp',
  '/assets/hero_image2.webp',
  '/assets/hero-image.png',
  '/assets/hero_image2.png',
  // About page image
  'https://res.cloudinary.com/dip0otvct/image/upload/f_auto,q_auto/v1749913084/About_-_Our_Story_bthrky.jpg',
  // CSS files
  '/src/components/Hero/Hero.css',
  '/src/components/Brands/Brands.css',
  '/src/components/Navbar/Navbar.css',
  '/src/components/Footer/Footer.css',
  '/src/pages/About/About.css',
  '/src/pages/Contact/Contact.css',
  '/src/pages/ProductDetails/ProductDetails.css',
  '/src/components/CTA/CTA.css',
  '/src/components/LanguageLoader/LanguageLoader.css',
  // Fonts
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
}); 