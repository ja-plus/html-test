/**
 * 拖动和缩放
 * @author JA+
 * TODO: scale 加上css过渡效果，但是translate不加，如何实现
 * 使用方式：
 *  let das = new DragAndScale('div','div>div')
 */

export default class DragAndScale {
  scale = 1; // 缩放
  maxScale = 3;
  minScale = 0.5;
  scaleStep = 0.1;
  startx = 0;
  starty = 0;
  sign = false; // 标志是否在拖拽
  translatex = 0; // 保存上一次移动时的坐标
  translatey = 0;
  offsetx = 0; // 记录正在拖动时的坐标
  offsety = 0;
  // transform = new Proxy({
  //   offsetx: 0,
  //   offsety: 0,
  //   scale: 0
  // }, {
  //   set(target, key, value){
  //     console.log('proxy set key', key, target[key], value);
  //     return Reflect.set(target, key);
  //   }
  // });
  /**
   *
   * @param {String} linstenerEle 触发事件的元素
   * @param {String} targetEle 响应变化的元素
   */
  constructor(linstenerEle, targetEle) {
    this.listenerEle =
      linstenerEle instanceof HTMLElement
        ? linstenerEle
        : document.querySelector(linstenerEle);
    this.listenerEle.style.cursor = 'move';
    this.targetEle =
      targetEle instanceof HTMLElement
        ? targetEle
        : document.querySelector(targetEle);
    this.targetEle.style.transformOrigin = 'center';
    this.initEventListener();
  }
  initEventListener() {
    if (this.listenerEle) {
      this.listenerEle.addEventListener(
        'wheel',
        (this.onWheelCb = this.onWheel.bind(this))
      );
      this.listenerEle.addEventListener(
        'mousedown',
        (this.onMouseDownCb = this.onMouseDown.bind(this))
      );
      this.listenerEle.addEventListener(
        'mousemove',
        (this.onMouseMoveCb = this.onMouseMove.bind(this))
      );
      this.listenerEle.addEventListener(
        'mouseup',
        (this.onMouseUpCb = this.onMouseUp.bind(this))
      );
      this.listenerEle.addEventListener('mouseleave', this.onMouseUpCb);
    }
  }
  /**
   *
   * @param {Event} e
   */
  onWheel(e) {
    e.stopPropagation();
    // e.preventDefault();
    e.deltaY < 0 ? this.zoom(1) : this.zoom(-1);
  }
  /**
   *
   * @param {Event} e
   */
  onMouseDown(e) {
    e.preventDefault();
    this.sign = true;
    this.startx = e.x;
    this.starty = e.y;
  }
  /**
   *
   * @param {Event} e
   */
  onMouseMove(e) {
    if (this.sign) {
      this.offsetx = this.translatex + e.x - this.startx;
      this.offsety = this.translatey + e.y - this.starty;
      // this.transform.offsetx = this.translatex + e.x - this.startx;
      // this.transform.offsety = this.translatey + e.y - this.starty;
      this.updateTransform();
    }
  }
  onMouseUp() {
    this.sign = false;
    this.translatex = this.offsetx;
    this.translatey = this.offsety;
  }
  removeListeners() {
    if (this.listenerEle) {
      this.listenerEle.removeEventListener('wheel', this.onWheelCb);
      this.listenerEle.removeEventListener('mousedown', this.onMouseDownCb);
      this.listenerEle.removeEventListener('mousemove', this.onMouseMoveCb);
      this.listenerEle.removeEventListener('mouseup', this.onMouseUpCb);
      this.listenerEle.removeEventListener('mouseleave', this.onMouseDownCb);
    }
  }
  /**
   * 更新属性
   * TODO: 将this.offsetx this.offsety this.scale 通过Proxy代理，检测值变化时更新位置？
   */
  updateTransform() {
    this.targetEle.style.transform = `translate(${this.offsetx}px, ${this.offsety}px) scale(${this.scale})`;
  }
  zoom(sign) {
    if (this.targetEle) {
      this.scale =
        sign < 0 ? this.scale - this.scaleStep : this.scale + this.scaleStep;
      if (this.scale < this.minScale) this.scale = this.minScale;
      else if (this.scale > this.maxScale) this.scale = this.maxScale;
      this.updateTransform();
    }
  }
}
