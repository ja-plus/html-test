/**
 * @typedef SortState
 * @property {string} dataIndex 排序的列
 * @property {null|'asc'|'desc'} order 排序顺序
 * @property {'number'|'string'} [sortType] 排序方式
 * ---
 * @callback CompareRule
 * @param {any} targetItem
 * @param {any} newItem
 * @return {-1|0|1}
 */

/**
 * 对有序数组二分插入新数据
 * @param {any[]} targetArray 表格数据
 * @param {any} newItem 要插入的数据
 * @param {CompareRule} compareRule 二分比较规则
 */
exports.insertToOrderedArray = function insertToOrderedArray(targetArray, newItem, compareRule) {
  const data = [...targetArray];
  // 二分插入
  let sIndex = 0;
  let eIndex = data.length - 1;
  while (sIndex <= eIndex) {
    const midIndex = Math.floor((sIndex + eIndex) / 2);
    const midItem = data[midIndex];
    const compareRes = compareRule(midItem, newItem);
    if (compareRes === 0) {
      sIndex = midIndex;
      break;
    } else if (compareRes < 0) {
      sIndex = midIndex + 1;
    } else {
      eIndex = midIndex - 1;
    }
  }
  data.splice(sIndex, 0, newItem);
  return data;
};
