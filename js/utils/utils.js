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
