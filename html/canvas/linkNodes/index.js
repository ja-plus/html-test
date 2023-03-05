const colorPicker = document.querySelector('#colorPicker');

// const linkNodes = new LinkNodes('#bg');
const htmlCanvas = document.getElementById('bg');
const offscreen = htmlCanvas.transferControlToOffscreen();
const worker = new Worker('LinkNodes/offscreenCanvas.js');
worker.postMessage({ type: 'init', width: window.innerWidth, height: window.innerHeight });
worker.postMessage({ canvas: offscreen }, [offscreen]);

// linkNodes.run();
window.addEventListener('resize', () => {
  // updateWindowSize();
  // linkNodes.initCanvasSize();
  worker.postMessage({ type: 'resize', width: window.innerWidth, height: window.innerHeight });
});
// // change color
colorPicker.addEventListener('change', e => {
  /**@type {string} */
  let color = e.target.value;
  // linkNodes.changeColor(color);
  worker.postMessage({ type: 'changeColor', color });
});
