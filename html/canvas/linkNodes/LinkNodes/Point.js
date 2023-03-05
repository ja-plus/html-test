let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
export function updateWindowSize() {
  innerWidth = window.innerWidth;
  innerHeight = window.innerHeight;
}
export class Point {
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
