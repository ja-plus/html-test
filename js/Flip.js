/**
 * FLIP是 First、Last、Invert和 Play四个单词首字母的缩写
 */
export default class Flip {
  /**
   * 开始位置
   * @param {HTMLElement[]} els
   * @param {number} duration seconds
   */
  constructor(els, duration) {
    /** @type {Map<HTMLElement,{x:number,y:number}>} */
    this.store = new Map();
    this.duration = duration;
    Array.from(els).forEach(ele => {
      const { x, y, width, height } = ele.getBoundingClientRect();
      this.store.set(ele, { x, y, width, height }); // FIXME: 可能造成内存泄漏
    });
  }
  /**
   * TODO: clone一个对象，不拉伸画面的情况淡出
   * TODO: 还原之前的style
   */
  play() {
    this.store.forEach((oldRect, el) => {
      const { x, y, width, height } = el.getBoundingClientRect();
      const translateX = x - oldRect.x;
      const translateY = y - oldRect.y;
      const scaleX = oldRect.width / width;
      const scaleY = oldRect.height / height;
      // 更新当前位置
      oldRect.x = x;
      oldRect.y = y;
      oldRect.width = width;
      oldRect.height = height;
      // 移动到之前的位置
      el.style.transition = 'none';
      el.style.transformOrigin = '0 0';
      el.style.transform = `translate(${-translateX}px,${-translateY}px) scale(${scaleX},${scaleY})`;
      // 通知浏览器重排
      void el.offsetHeight;
      // 过渡到当前位置
      el.style.transition = `transform ${this.duration}s ease`;
      el.style.transform = `translate(0px,0px) scale(1,1)`;
    });
  }
}
