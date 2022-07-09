let cacheName = '2048-pwa';
let cacheList = ['/'];
self.addEventListener('install', e => {
  console.log('service worker installed');
  // 需要缓存的资源
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        return cache.addAll(cacheList);
      })
      .then(() => self.skipWaiting()),
  );
});

// 清除缓存
self.addEventListener('activate', function (e) {
  console.log('[Service Worker] Activated');
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (cacheName.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );
});

// 拦截请求
self.addEventListener('fetch', e => {
  e.responseWith(
    // 匹配缓存
    caches.match(e.request).then(r => {
      console.log('[Service Worker] Fetching resource: ' + e.request.url);
      if (r) return r;
      // 请求数据
      return fetch(e.request).then(response => {
        // 保存缓存
        return caches.open(cacheName).then(cache => {
          console.log('[Service Worker] Caching new resource: ' + e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    }),
  );
});
