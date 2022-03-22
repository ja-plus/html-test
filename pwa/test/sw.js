var cacheName = 'minimal-pwa-6'; // 用来控制静态资源缓存

var cacheList = ['/', 'index.html', 'main.css', 'favicon.ico', '../../html/img/searah.jpg', 'images/icon_256x256.png'];

self.addEventListener('install', e => {
  console.log('sw installed', e);
  e.waitUntil(
    //   caches
    //     .open(cacheName)
    //     .then(cache => cache.addAll(cacheList))
    //     .then(() => self.skipWaiting()),
    caches.open(cacheName).then(function (cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(cacheList);
    }),
  );
});
// 清除缓存
self.addEventListener('activate', function (e) {
  console.log('[Service Worker] Activated');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (cacheName.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );
});
// self.addEventListener('fetch', function (e) {
//   e.respondWith(
//     caches.match(e.request).then(function (response) {
//       if (response != null) {
//         return response;
//       }
//       return fetch(e.request.url);
//     }),
//   );
// });
self.addEventListener('fetch', function (e) {
  e.respondWith(
    // 当缓存存在时，我们使用缓存来提供服务，而不重新请求数据
    caches.match(e.request).then(function (r) {
      console.log('[Service Worker] Fetching resource: ' + e.request.url);
      return (
        r ||
        fetch(e.request).then(function (response) {
          // 当请求的文件不在缓存中时，我们会在响应之前将数据添加到缓存中。
          return caches.open(cacheName).then(function (cache) {
            console.log('[Service Worker] Caching new resource: ' + e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    }),
  );
});
// self.addEventListener('fetch', function (e) {
//   console.log('[Service Worker] Fetched resource ' + e.request.url);
// });
