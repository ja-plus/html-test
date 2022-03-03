import Vue from 'vue';
/**
 * 参数是距离顶部的偏移量
 * 使用
 * <div v-sticky="10"></div>
 */
Vue.directive('sticky', {
  inserted(el, binding) {
    const rect = el.getBoundingClientRect();
    /** 这里加上滚动条的位置，原因：
     * 页面滚动后再刷新，浏览器会自动跳转到之前滚动的位置
     * 此时，获取到的 rect.top 的位置是不对的
     */
    // 获取元素最初距离顶部的位置
    const originTop = rect.top + window.pageYOffset;
    const originLeft = rect.left + window.pageXOffset;
    if (!binding.value) binding.value = 0;
    const paddingTop = binding.value;
    window.stickyScrollCallback = () => {
      // 页面滚动距离大于元素最初距离顶部位置，则使元素变为position:fixed
      if (window.pageYOffset > originTop - paddingTop) {
        el.style.cssText = `
                    position: fixed;
                    left: ${originLeft}px;
                    top: ${paddingTop}px;
                    z-index: 10;
                    box-shadow: 0 0 15px #ddd;
                `;
      } else {
        el.style.cssText = '';
      }
    };
    window.addEventListener('scroll', window.stickyScrollCallback);
  },
  unbind() {
    window.removeEventListener('scroll', window.stickyScrollCallback);
  },
});
