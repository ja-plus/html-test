onmessage = function (e) {
  //   console.log('worker received message:', e);
  postMessage(e.data.sort((a, b) => a - b));
};
