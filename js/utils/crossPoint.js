/**
 * 坐标点
 * @typedef {[number,number]} Point
 */
/**
 * 曲线配置
 * @typedef Line
 * @prop {Point[]} points 由多个坐标点构成[[x1,y1],[x2,y2]]
 */
/**
 * 获取两条曲线的交点
 * @param {Line} line1
 * @param {Line} line2
 */
export function crossPoint(line1, line2) {
  // 曲线为一次函数
  const [[x1, y1], [x2, y2]] = line1.points;
  const [[x3, y3], [x4, y4]] = line2.points;
  const x = (x2 * (y2 - y1) * (x4 - x3) - x3 * (x1 - x2) * (y3 - y4)) / ((y1 - y2) * (x3 - x4) - (x1 - x2) * (y3 - y4));
  const y = ((x - x1) * (y1 - y2)) / (x1 - x2) + y1;
  return [x, y];
}
