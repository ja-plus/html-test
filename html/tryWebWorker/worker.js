self.onmessage = function (e) {
  if (e.data.fun === 'sharedArray') {
    const sharedArray = new Uint32Array(e.data.sharedArray);
    sharedArray[2] = 234;
    console.log('worker:', sharedArray);
  } else {
    console.log('worker receive data:', e.data);
    console.time('worker postMessage to main thread cost');
    self.postMessage('hi'); // 给主进程发消息
    console.timeEnd('worker postMessage to main thread cost');
  }
};
