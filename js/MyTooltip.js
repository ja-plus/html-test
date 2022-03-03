/**
 * 模拟原生title属性行为的东西
 * @autor JA+
 */
export default class MyTooltip {
  /** @type {HTMLElement} 事件触发目标元素*/
  targetEle;
  /** @type {HTMLElement} 挂载元素*/
  mountedEle;
  /** @type {HTMLElement} tooltip元素*/
  tooltip;

  showTimeout = null;
  // config
  content = ''; // 文字
  delay = 500;
  offset = [16, 0];
  /**
   * @param {HTMLElement|String} target
   * @param {{
   *  content: String
   *  mounted?: HTMLElement | String
   *  delay?: Number
   *  offset?: Array<Number>
   * }} config
   */
  constructor(target, config = {}) {
    let { content, mounted, delay, offset } = config;
    this.content = content;
    if (delay) this.delay = delay;
    if (offset) this.offset = offset;
    this.targetEle =
      target instanceof HTMLElement ? target : document.querySelector(target);
    this.mountedEle =
      mounted instanceof HTMLElement
        ? mounted
        : document.querySelector(mounted) || document.body;
    this.initTooltip();
    this.initListeners();
  }
  initTooltip() {
    this.tooltip = document.createElement('div');
    this.tooltip.textContent = this.content;
    this.tooltip.style.cssText = ` 
      font-size: 14px;
      box-shadow: 0 0 10px #ccc;
      padding: 5px 10px;
      border-radius: 5px;
      display: none;
      position:fixed;
      left:0px;
      top:0px;
      background:#fff;
      z-index:99;
    `;
    this.mountedEle.append(this.tooltip);
  }
  initListeners() {
    this.targetEle.addEventListener('mousemove', this.mouseMove.bind(this));
    this.targetEle.addEventListener('mouseleave', () => {
      this.tooltip.style.display = 'none';
      clearTimeout(this.showTimeout);
    });
  }
  /**
   * @param {Event} e
   */
  mouseMove(e) {
    this.tooltip.style.display = 'none';
    clearTimeout(this.showTimeout);
    this.showTimeout = setTimeout(() => {
      this.tooltip.style.left = e.x + this.offset[0] + 'px';
      this.tooltip.style.top = e.y + this.offset[1] + 'px';
      this.tooltip.style.display = 'inline-block';
    }, this.delay);
  }
}
