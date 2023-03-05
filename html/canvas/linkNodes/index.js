import { Point, updateWindowSize } from './Point.js';
const colorPicker = document.querySelector('#colorPicker');
let lineColor = '255,255,255';
const pointCount = 100;
const backgroundColor = '#000';
/**@type {Point[]} */
const points = [];
/**@type {HTMLCanvasElement} */
const canvas = document.querySelector('#bg');
const ctx = canvas.getContext('2d');
function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
init();
window.addEventListener('resize', () => {
  init();
  updateWindowSize();
});
// change color
colorPicker.addEventListener('change', e => {
  /**@type {string} */
  let color = e.target.value;
  //change point color
  points.forEach(point => {
    point.color = color;
  });
  // change line color
  color = color.slice(1);
  let tmp = '';
  let tmpArr = [];
  for (let i = 0; i < color.length; i++) {
    const char = color.charAt(i);
    tmp += char;
    if (i % 2) {
      tmpArr.push(tmp);
      tmp = '';
    }
  }
  for (let i = 0; i < tmpArr.length; i++) {
    tmpArr[i] = Number('0x' + tmpArr[i]).toString();
  }
  lineColor = tmpArr.join(',');
});

function createPoints() {
  for (let i = 0; i < pointCount; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const point = new Point(x, y);
    points.push(point);
  }
}
createPoints();
function drawPoints() {
  points.forEach(point => {
    point.updatePosition();
    point.draw(ctx);
  });
}
function drawLink() {
  for (let i = 0; i < points.length; i++) {
    const { x: x1, y: y1 } = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const { x: x2, y: y2 } = points[j];
      const distance = Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
      if (distance < 50) {
        // draw line
        drawLine(x1, y1, x2, y2);
      }
      if (distance < 100) {
        const opacity = (100 - distance) / 50;
        drawLine(x1, y1, x2, y2, opacity);
      }
    }
  }
}
function drawLine(x1, y1, x2, y2, opacity = 1) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = `rgba(${lineColor},${opacity})`;
  ctx.stroke();
  ctx.closePath();
}
function clear() {
  ctx.rect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = backgroundColor;
  ctx.fill();
}
function run() {
  window.requestAnimationFrame(() => {
    clear();
    drawPoints();
    drawLink();
    run();
  });
}
run();
