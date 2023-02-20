export type NodeType = 'root' | 'more' | 'parent' | 'leaf';
export type TreeData = {
  name: string;
  align?: 'left';
  lineText?: string;
  nodeType?: NodeType;
  moreData?: TreeData[];
  children?: TreeData[];
};

export type KeyFunc = (item: any) => string;
export type Key = string | KeyFunc;
/**
 * 事件类型
 * @description leafClick - 叶子节点点击
 * @description lineTextClick - 线上的字点击
 * @description rootClick - 根节点点击
 */
export type EventType = 'leafClick' | 'lineTextClick' | 'rootClick' | 'zoom';
export type EventCb = (...args: any[]) => void;
