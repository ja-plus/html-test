let innerWidth = 800;
let innerHeight = 600;
class Point {
  x;
  y;
  color = '#fff';
  size = 2;
  /**方向,sin */
  direction = {
    sin: null,
    cos: null,
  };
  /**速度 */
  speed = 1;
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const sin = Math.sin(Math.random() * 2 * Math.PI);
    this.direction = {
      sin,
      cos: (Math.random() < 0.5 ? -1 : 1) * sin,
    };
    this.speed = Math.random() * 0.2 + 0.3;
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 2 * Math.PI, 0);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  updatePosition() {
    const addY = this.speed * this.direction.sin;
    const addX = this.speed * this.direction.cos;
    this.x += addX;
    this.y += addY;
    if (this.x < 0) {
      this.x = -this.x;
      this.direction.cos = -this.direction.cos;
    } else if (this.x > innerWidth) {
      this.direction.cos = -this.direction.cos;
      this.x = 2 * innerWidth - this.x;
    }
    if (this.y < 0) {
      this.y = -this.y;
      this.direction.sin = -this.direction.sin;
    } else if (this.y > innerHeight) {
      this.y = 2 * innerHeight - this.y;
      this.direction.sin = -this.direction.sin;
    }
  }
}

class LinkNodes {
  /**@type {HTMLCanvasElement} */
  canvas;
  ctx;
  /**@type {Point[]} */
  points = [];
  lineColor = '255,255,255';
  pointCount = 100;
  backgroundColor = '#000';
  fpsMs = Date.now();
  fpsCount = 0;
  fps = 0;
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.createPoints();
    this.initCanvasSize();
  }
  initCanvasSize() {
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
  }
  createPoints() {
    for (let i = 0; i < this.pointCount; i++) {
      const x = Math.random() * innerWidth;
      const y = Math.random() * innerHeight;
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
    this.ctx.rect(0, 0, innerWidth, innerHeight);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fill();
  }
  run() {
    self.requestAnimationFrame(() => {
      this.clear();
      this.drawPoints();
      this.drawLink();
      this.updateFps();
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

  updateFps() {
    // // 设置文字阴影的颜色为黑色，透明度为20%
    // this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    // // 将阴影向右移动15px，向上移动10px
    // this.ctx.shadowOffsetX = 2;
    // this.ctx.shadowOffsetY = 2;
    // // 轻微模糊阴影
    // this.ctx.shadowBlur = 2;
    this.fpsCount++;
    this.ctx.font = '24px Arial';
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillText(`Fps: ${this.fps}`, innerWidth - 100, 20);
    const now = Date.now();
    if (now - this.fpsMs < 1000) return;

    this.fpsMs = now;
    this.fps = this.fpsCount;
    this.fpsCount = 0;
  }
}

/**@type {LinkNodes} */
let linkNodes;
self.onmessage = function (evt) {
  if (evt.data.type === 'init') {
    innerWidth = evt.data.width;
    innerHeight = evt.data.height;
  }
  if (evt.data.canvas) {
    let canvas = evt.data.canvas;
    linkNodes = new LinkNodes(canvas);
    linkNodes.run();
  }
  if (evt.data.type === 'resize') {
    innerWidth = evt.data.width;
    innerHeight = evt.data.height;
    linkNodes.initCanvasSize();
  }
  if (evt.data.type === 'changeColor') {
    linkNodes.changeColor(evt.data.color);
  }
};
