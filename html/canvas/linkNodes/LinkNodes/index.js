import { Point } from './Point.js';

export class LinkNodes {
  /**@type {HTMLCanvasElement} */
  canvas;
  ctx;
  /**@type {Point[]} */
  points = [];
  lineColor = '255,255,255';
  pointCount = 100;
  backgroundColor = '#000';
  constructor(selector) {
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext('2d');
    this.createPoints();
    this.initCanvasSize();
  }
  initCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  createPoints() {
    for (let i = 0; i < this.pointCount; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const point = new Point(x, y);
      this.points.push(point);
    }
  }
  drawPoints() {
    this.points.forEach(point => {
      point.updatePosition();
      point.draw(this.ctx);
    });
  }
  drawLink() {
    for (let i = 0; i < this.points.length; i++) {
      const { x: x1, y: y1 } = this.points[i];
      for (let j = i + 1; j < this.points.length; j++) {
        const { x: x2, y: y2 } = this.points[j];
        const distance = Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
        if (distance < 50) {
          // draw line
          this.drawLine(x1, y1, x2, y2);
        }
        if (distance < 100) {
          const opacity = (100 - distance) / 50;
          this.drawLine(x1, y1, x2, y2, opacity);
        }
      }
    }
  }
  drawLine(x1, y1, x2, y2, opacity = 1) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = `rgba(${this.lineColor},${opacity})`;
    this.ctx.stroke();
    this.ctx.closePath();
  }
  clear() {
    this.ctx.rect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fill();
  }
  run() {
    window.requestAnimationFrame(() => {
      this.clear();
      this.drawPoints();
      this.drawLink();
      this.run();
    });
  }
  changeColor(color) {
    //change point color
    this.points.forEach(point => {
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
    this.lineColor = tmpArr.join(',');
  }
}
