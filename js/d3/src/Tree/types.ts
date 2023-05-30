import { EnterElement, HierarchyPointLink, HierarchyPointNode, Selection } from 'd3';

export type NodeType = 'root' | 'parent' | 'leaf' | 'more';
export type TreeData = {
  id: string; //唯一值
  name: string; //标签名称
  align?: 'left'; // 左侧还是右侧
  lineText?: string; // 线上的数值
  nodeType?: NodeType; //节点类型
  moreData?: TreeData[]; // 暂存更多的节点
  children?: TreeData[]; // 子节点
  backgroundColor?: string; // 仅NodeType == 'parent'生效
  icon?: string; // 根节点图标
};
/**构造函数传参 */
export type ConsOption = {
  key: string;
  width: string | number;
  height: string | number;
  /**是否虚拟展示 */
  virtual?: boolean;
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

export type NodeSelection = Selection<SVGGElement, HierarchyPointNode<TreeData>, SVGGElement, unknown>;
export type LinkSelection = Selection<EnterElement, HierarchyPointLink<TreeData>, SVGGElement, unknown>;
