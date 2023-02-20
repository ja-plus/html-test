export type NodeType = 'root' | 'more' | 'parent' | 'leaf';
export type TreeData = {
  id: string;
  name: string;
  align?: 'left';
  lineText?: string;
  nodeType?: NodeType;
  moreData?: TreeData[];
  children?: TreeData[];
  backgroundColor?: string; // 仅NodeType == 'parent'生效
};
/**构造函数传参 */
export type ConsOption = {
  key: string;
  width: string | number;
  height: string | number;
};

export type KeyFunc = (item: any) => string;
export type Key = string | KeyFunc;
/**
 * 事件类型
 * @description leafClick - 叶子节点点击
 * @description lineTextClick - 线上的字点击
 * @description rootClick - 根节点点击
 * @description zoom - d3.zoom 拖拽或缩放
 */
export type EventType = 'leafClick' | 'lineTextClick' | 'rootClick' | 'zoom';
export type EventCb = (...args: any[]) => void;
