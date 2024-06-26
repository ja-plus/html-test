/** 获取所有叶子节点 */
export function getLeafNodes(treeItem, childrenKey = 'children') {
  const leaves = [];
  (function getNodes(item) {
    if (item[childrenKey]?.length) {
      item[childrenKey].forEach(it => {
        if (!it[childrenKey]) {
          leaves.push(it);
        } else {
          getNodes(it);
        }
      });
    }
  })(treeItem);
  return leaves;
}

/** Input 只能输入数字 */
export function onlyNumber(e) {
  if (!(e.code.startsWith('Digit') || e.code.startsWith('Numpad') || ['Period', 'Backspace', 'Delete'].includes(e.code))) {
    e.preventDefault();
  }
}
/**
 * input 字符串转数字
 * @param {string} str
 */
export function validInputNumber(str) {
  const numStr = str.replace(/[^d^\.^-]/);
  const matchResult = numStr.match(/^[-\d]\d*(\.\d*)?/);
  if (!matchResult) return '';
  return matchResult[0];
}

/** 遍历树结构 */
export function treeForEach(tree, callback) {
  (function recursion(arr) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const cbRes = callback(item, i);
      if (cbRes === 0) return 0;
      if (item.children) {
        const res = recursion(item.children);
        if (res === 0) return 0;
      }
    }
  })(tree);
}

/**
 * 比较两个对象是否相等
 * @param {object} originObj
 * @param {object} newObj
 * @return {boolean}
 */
function objIsSame(originObj, newObj) {
  if (Object.prototype.toString.call(originObj) === '[object Object]' && Object.prototype.toString(newObj) === '[object Object]') {
    for (const key in originObj) {
      if (Object.hasOwnProperty.call(originObj, key)) {
        const originItem = originObj[key];
        const newItem = newObj[key];
        const res = objIsSame(originItem, newItem);
        if (!res) return false;
      }
    }
  } else if (Array.isArray(originObj) && Array.isArray(newObj)) {
    return arrIsSame(originObj, newObj);
  } else {
    return originObj === newObj;
  }
  return true;
}

/**
 * 比较两个数组是否相等
 * @param {array} arr1
 * @param {array} arr2
 * @returns {boolean}
 */
function arrIsSame(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (!objIsSame(arr1[i], arr2[i])) return false;
  }
  return true;
}

/**
 * 无效数字排在最后的排序demo
 * @returns {Number}
 */
export function numberSorter(a, b) {
  if (a === '--' && b !== '--') return 1;
  if (a === '--' && b === '--') return 0;
  if (a !== '--' && b === '--') return -1;
  return Number(a) < Number(b) ? -1 : 1;
}

/**
 * 异步防抖
 * @param {number} delay 延时
 * @return {Promise}
 */
export function debounceSync(delay) {
  let timer = 0;
  let lastPromiseReject = () => void 0; // 暂存上一次promise的reject
  return function () {
    if (timer) clearTimeout(timer); // clear timeout后，之前的promise 状态不会变。
    lastPromiseReject(); // 主动reject之前的promise
    return new Promise((resolve, reject) => {
      lastPromiseReject = reject; // 保存reject函数，供下一次调用。
      timer = window.setTimeout(resolve, delay);
    });
  };
}

/**
 * 异步节流
 * @param {number} delay
 * @returns {Promise}
 */
export function throttleSync(delay) {
  let timer = 0;
  return function () {
    if (timer) return Promise.reject();
    timer = window.setTimeout(() => {
      timer = 0;
    }, delay);
    return Promise.resolve();
  };
}
