const cacheName = '2048-pwa';
/** 文件夹一定要用./开头 */
const cacheList = [
  '/webgame/src/index.html',
  '/webgame/src/style.css',
  '/webgame/src/js/2048.js',
  '/webgame/src/js/gameCore.js',
  '/webgame/src/js/pwa.js',
  '/webgame/src/assets/512x512.png',
];
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
self.addEventListener('fetch', function (e) {
  // console.log('拦截fetch', e);
  e.respondWith(
    // 匹配缓存
    caches.match(e.request).then(res => {
      console.log('[Service Worker] Fetching resource: ' + e.request.url);
      // 返回缓存中的数据
      if (res) return res;
      // 缓存中没有就 请求数据
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
