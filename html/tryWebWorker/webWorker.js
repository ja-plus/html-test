self.onmessage = function (e) {
  // console.log(e.data, 'worker e.data');
  console.time('workerSortTime');
  let arr = new Float32Array(e.data);
  // console.log(arr, 'Float32Array');
  arr = arr.sort((a, b) => a - b);
  //   console.log('worker received message:', e);
  console.timeEnd('workerSortTime');
  // 所有权转移
  self.postMessage(arr, [arr.buffer]);
  console.log('worker arr 所有权已转移', arr);
};
