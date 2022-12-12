/** 珠排序 */
let arr = [7, 6, 5, 2, 1, 4];
const maxLength = Math.max(...arr);
function main() {
  let tempArr = changeArr(arr);
  console.log('-----begin\n' + arr);
  console.log('-----start\n' + tempArr.join('\n'));
  for (let j = 0; j < tempArr.length; j++) {
    for (let i = tempArr.length - 1; i > 0; i--) {
      let item = tempArr[i];
      let before = tempArr[i - 1];
      // item.charAt(item.length);
      // if (item.length !== before.length) {
      //   // 使比较的两个数长度相等
      //   const maxLength = Math.max(item.length, before.length);
      //   _maxLength = Math.max(maxLength, _maxLength);
      //   tempArr[i] = item.padStart(maxLength, '0');
      //   tempArr[i - 1] = before.padStart(maxLength, '0');
      // }
      // console.log(tempArr[i], i);
      item = tempArr[i].split('');
      before = tempArr[i - 1].split('');
      // compare
      for (let i = item.length - 1; i >= 0; i--) {
        if (+item[i] === 0) {
          item[i] = before[i];
          before[i] = '0';
        }
      }
      tempArr[i] = item.join('');
      tempArr[i - 1] = before.join('');
    }
    // console.log('------time\n' + tempArr.join('\n'));
  }

  console.log('------end\n' + tempArr.join('\n'));
  console.log('------result\n' + tempArr.map(v => v.match(/1/g).length));
}
main();
/**
 *
 * @param {number[]} arr
 * @return {string[]}
 */
function changeArr(arr) {
  return arr.map(v => '1'.repeat(v).padEnd(maxLength, '0'));
}
