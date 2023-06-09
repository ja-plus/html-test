/**
 * FLIP是 First、Last、Invert和 Play四个单词首字母的缩写
 */
export default class Flip {
  /** @type {Map<HTMLElement, HTMLElement>} */
  elCloneStore = new Map();
  /**
   * 开始位置
   * @param {HTMLElement[]} els
   * @param {number} options.duration seconds
   */
  constructor(els, options) {
    /** @type {Map<HTMLElement,{x:number,y:number,width:number,height:number}>} */
    this.store = new Map();
    this.duration = options.duration;
    Array.from(els).forEach(ele => {
      const { x, y, width, height } = ele.getBoundingClientRect();
      // console.log(x, y, width, height);
      this.store.set(ele, { x, y, width, height }); // FIXME: 可能造成内存泄漏
    });
  }
  /**
   * TODO: clone一个对象，不拉伸画面的情况淡出
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
      // 在之前位置生成一个副本
      const elClone = el.cloneNode(true);
      elClone.style.cssText = `
        pointer-events:none;
        transform-origin:0 0;
        position:fixed;
        z-index:1;
        left:${oldState.x}px;
        top:${oldState.y}px;
        width:${oldState.width}px;
        height:${oldState.height}px;
        transition: all ${this.duration}s ease;
      `;
      document.body.appendChild(elClone);
      // 保存，用于打断
      this.elCloneStore.set(el, elClone);
      elClone.addEventListener('transitionend', elClone.remove, { once: true });
      void elClone.offsetHeight;
      // 副本动画
      elClone.style.transform = `translate(${translateX}px,${translateY}px) scale(${width / oldState.width},${height / oldState.height})`;
      elClone.style.opacity = 0;

      // 移动到之前的位置
      el.style.opacity = '0';
      el.style.transition = 'none';
      el.style.transformOrigin = '0 0';
      el.style.transform = `translate(${-translateX}px,${-translateY}px) scale(${scaleX},${scaleY})`;
      // 通知浏览器重排
      void el.offsetHeight;

      // 过渡到当前位置
      el.style.transition = `transform ${this.duration}s ease, opacity ${this.duration}s ease`;
      el.style.transform = 'translate(0px,0px) scale(1,1)';
      el.style.opacity = '1';
    });
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
