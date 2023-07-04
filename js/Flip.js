/**
 * @typedef Options
 * @property {number} duration 动画时间
 * @property {boolean} cloneNode 复制节点,优化缩放动画。更耗性能。
 */
/**
 * FLIP是 First、Last、Invert和 Play四个单词首字母的缩写
 */
export default class Flip {
  /** @type {WeakMap<HTMLElement, HTMLElement>} */
  elCloneStore = new WeakMap();
  /** @type {} */
  options;
  /**
   * 开始位置
   * @param {HTMLElement[]} els
   * @param {Options} options
   */
  constructor(els, options) {
    /** @type {Map<HTMLElement,{x:number,y:number,width:number,height:number}>} */
    this.store = new Map();
    this.options = {
      duration: 0.5,
      cloneNode: false,
      ...options,
    };

    Array.from(els).forEach(ele => {
      const { x, y, width, height } = ele.getBoundingClientRect();
      this.store.set(ele, { x, y, width, height });
    });
  }
  /**
   * TODO: 还原之前的style
   */
  play() {
    this.store.forEach((oldState, el) => {
      const { x, y, width, height } = el.getBoundingClientRect();
      // console.log(x, y, width, height, oldState);
      const translateX = x - oldState.x;
      const translateY = y - oldState.y;
      const scaleX = oldState.width / width;
      const scaleY = oldState.height / height;
      // 相同位置时，不触发动画
      if (translateX === 0 && translateY === 0 && scaleX === 1 && scaleY === 1) return;

      if (this.options.cloneNode) {
        this.playCloneNode(el, { oldState, translateX, translateY, width, height });
        el.style.opacity = '0';
      }
      // 移动到之前的位置
      el.style.transition = 'none';
      el.style.transformOrigin = '0 0';
      el.style.transform = `translate(${-translateX}px,${-translateY}px) scale(${scaleX},${scaleY})`;
      // 通知浏览器重排
      void el.offsetHeight;

      // 过渡到当前位置
      el.style.transition = `transform ${this.options.duration}s ease, opacity ${this.options.duration}s ease`;
      el.style.transform = 'translate(0px,0px) scale(1,1)';
      el.style.opacity = '1';
    });
  }
  /**
   *
   * @param {HTMLElement} el
   */
  playCloneNode(el, { oldState, translateX, translateY, width, height }) {
    // 在之前位置生成一个副本
    const elClone = el.cloneNode(true);
    // const elCloneStyle = window.getComputedStyle(el);
    elClone.style.cssText = `
      pointer-events:none;
      transform-origin:0 0;
      position:fixed;
      z-index:1;
      left:${oldState.x}px;
      top:${oldState.y}px;
      width:${oldState.width}px;
      height:${oldState.height}px;
      transition: all ${this.options.duration}s ease;
    `;
    el.parentElement.insertBefore(elClone, el);
    // 保存，用于打断动画时，清除此元素
    this.elCloneStore.set(el, elClone);
    elClone.addEventListener('transitionend', elClone.remove, { once: true });
    void elClone.offsetHeight;
    // 副本动画
    elClone.style.transform = `translate(${translateX}px,${translateY}px) scale(${width / oldState.width},${height / oldState.height})`;
    elClone.style.opacity = 0;
  }
  /**
   * 记录当前位置
   * @param {HTMLElement} [el]
   */
  record(el) {
    if (el) {
      const { x, y, width, height } = el.getBoundingClientRect();
      this.store.set(el, { x, y, width, height });
      // 清除elClone
      const elClone = this.elCloneStore.get(el);
      elClone?.remove();
    } else {
      this.store.forEach((oldState, el) => {
        const { x, y, width, height } = el.getBoundingClientRect();
        this.store.set(el, { x, y, width, height });
        // 清除elClone
        const elClone = this.elCloneStore.get(el);
        elClone?.remove();
      });
    }
  }

  /**
   * 回收指定el
   * @param {HTMLElement| HTMLElement[]}
   */
  clean(el) {
    if (Array.isArray(el)) {
      el.forEach(it => this.store.delete(it));
    } else {
      this.store.delete(el);
    }
  }
}
