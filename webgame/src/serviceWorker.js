const cacheName = '2048-pwa';
/** 缓存用到的静态资源，在service worker第一次注册的时候就缓存,这里的路径是相对于本文件的路径*/
const cacheList = [
  './index.html',
  './manifest.json',
  './style.css',
  './js/2048.js', // type 为module的js 第一次进入后虽然被缓存，但是 caches.match的时候返回为undefined，为什么
  './js/gameCore.js',
  './js/pwa.js',
  './assets/512x512.png',
  './assets/Comic.ttf',
];
self.addEventListener('install', e => {
  console.log('service worker installed');
  // 需要缓存的资源,waitUntil中的回调若出错则视为install事件失败
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
    // 匹配缓存 caches.match(e.request) 会匹配不到一些资源
    caches.match(e.request.url).then(res => {
      console.log('[Service Worker] caches.match resource: ' + e.request.url, res);
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
