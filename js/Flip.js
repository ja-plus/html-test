/**
 * FLIP是 First、Last、Invert和 Play四个单词首字母的缩写
 */
export default class Flip {
  /**
   * 开始位置
   * @param {HTMLElement[]} eles
   * @param {number} duration
   */
  constructor(eles, duration) {
    /** @type {Map<HTMLElement,{x:number,y:number}>} */
    this.store = new Map();
    this.duration = duration;
    Array.from(eles).forEach(ele => {
      const { x, y } = ele.getBoundingClientRect();
      this.store.set(ele, { x, y });
    });
  }
  play() {
    this.store.forEach((old, k) => {
      const { x, y } = k.getBoundingClientRect();
      const translateX = x - old.x;
      const translateY = y - old.y;
      // 更新当前位置
      old.x = x;
      old.y = y;
      // 移动到之前的位置
      k.style.transition = 'none';
      k.style.transform = `translate(${-translateX}px,${-translateY}px)`;
      // 通知浏览器重排
      void k.offsetHeight;
      // 过渡到当前位置
      k.style.transition = `transform ${this.duration}s ease`;
      k.style.transform = `translate(0px,0px)`;
    });
  }
}
