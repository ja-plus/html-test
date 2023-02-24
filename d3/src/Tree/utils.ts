import * as D3 from 'd3';
import { HierarchyNode, HierarchyPointNode } from 'd3';
import { Key, TreeData } from './types';

/**
 * 增加查看更多按钮
 * @param {HierarchyNode<TreeData>} tree
 */
export function addShowMoreNode(tree: HierarchyNode<TreeData>, options?: { size?: number; depth?: number }) {
  const { size, depth } = Object.assign({ size: 5, depth: 0 }, options || {});

  if (tree.children) {
    if (tree.children.length > size && tree.depth > depth) {
      const treeLen = tree.children.length;
      const visibleNode = tree.children.slice(0, size);
      const moreData = tree.children.slice(size);
      if (moreData.length === 1 && moreData[0].data.nodeType === 'more') return;
      moreData.forEach(it => addShowMoreNode(it, options)); // 隐藏起来的节点也要遍历子节点

      const showMoreNode = D3.hierarchy<TreeData>({
        id: Date.now() + '' + Math.random(),
        name: `查看更多(${treeLen - size})`,
        nodeType: 'more',
      });
      (showMoreNode as any).depth = moreData[0].depth;
      (showMoreNode as any).height = moreData[0].height;
      (showMoreNode as any).parent = moreData[0].parent;
      (showMoreNode as any).moreData = moreData;
      visibleNode.push(showMoreNode);
      tree.children = visibleNode;
    }
    tree.children.forEach(it => addShowMoreNode(it, options));
  }
}
/**将树分成左右两边，横坐标置反 */
export function separateTree(nodes: HierarchyPointNode<TreeData>) {
  const leftTree: HierarchyPointNode<TreeData>[] = [];
  const rightTree: HierarchyPointNode<TreeData>[] = [];
  nodes.children?.forEach(child => {
    if (child.data.align === 'left') leftTree.push(child);
    else rightTree.push(child);
  });
  // 左右树分开，并垂直居中
  const leftMiddleOffset = leftTree.length > 1 ? (leftTree[0].y + leftTree.at(-1)!.y) / 2 : leftTree[0]?.y || 0;
  leftTree.forEach(a => {
    a.descendants().forEach(b => {
      b.x = -b.x;
      b.y -= leftMiddleOffset;
    });
  });
  const rightMiddleOffset = rightTree.length > 1 ? (rightTree[0].y + rightTree.at(-1)!.y) / 2 : rightTree[0]?.y || 0;
  rightTree.forEach(a => {
    a.descendants().forEach(b => {
      b.y -= rightMiddleOffset; // 垂直居中
    });
  });
}

/**
 *
 * @param {TreeData} tree
 * @param {function} callback
 */
export function eachChildren(tree: TreeData[], callback: (item: TreeData) => void) {
  (function recursion(tree) {
    tree.forEach(child => {
      callback(child);
      if (child.children) {
        recursion(child.children);
      }
    });
  })(tree);
}

/**
 * 获取key
 * @param {object} obj
 * @param {string|function} key
 * @returns
 */
export function keyGen(obj: any, key: Key) {
  return typeof key === 'function' ? key(obj) : obj[key];
}

/**
 * 保存节点位置
 */
export class PositionStore {
  store = new Map<string, [number, number]>();
  key: Key;
  constructor(key: Key) {
    this.key = key;
  }
  getPosition(d: any, nodeKey: string, parentKey = 'parent') {
    let position: [number, number] = [d[parentKey]?.x || 0, d[parentKey]?.y || 0];
    if (!nodeKey) return position;
    const storePosition = this.store.get(nodeKey);
    if (storePosition) return storePosition;
    const parentNode = this.getParentByKey(d, nodeKey, parentKey);
    if (parentNode) {
      position = [parentNode.x, parentNode.y];
      this.store.set(nodeKey, position);
    }
    return position;
  }

  getParentByKey(tree: TreeData, keyVal: string, parentKey: string) {
    let cur: any = tree;
    while ((cur = cur[parentKey])) {
      if (keyGen(cur.data, this.key) === keyVal) {
        return cur;
      }
    }
  }
}

type HighlightConsOption = {
  /**注入的键 */
  highlightKeyName: string;
  /**高亮规则 */
  highlightRule: (node: HierarchyPointNode<TreeData>) => boolean;
};
/**
 * 增加高亮标记
 * 保存需要展开的节点
 */
export class HighlightHelper {
  /**需要展开的节点的栈 */
  #expandStack: HierarchyPointNode<TreeData>[] = [];
  options: HighlightConsOption;
  constructor(options: HighlightConsOption) {
    this.options = options;
  }
  reset() {
    this.#expandStack = [];
  }
  /**得到需要展开的节点的栈 */
  getExpandStack() {
    return this.#expandStack;
  }
  /**给高亮的节点增加标记 */
  setHighlightFlag(node: HierarchyPointNode<TreeData>): boolean {
    if (this.options.highlightRule(node)) {
      (node as any)[this.options.highlightKeyName] = true;
      return true;
    }
    // 先清除当前节点高亮
    delete (node as any)[this.options.highlightKeyName];

    let isHighlight = false;
    // 收起的children 暂存在_children中，根据这两个属性判断节点收起还是展开
    const children = node.children || (node as any)._children || (node as any).moreData;
    if (!children?.length) return false;

    for (const childNode of children) {
      const res = this.setHighlightFlag(childNode);
      isHighlight = isHighlight || res; // 千万不能写成isHighlight || setHighlightFlag(childNode) 导致方法不执行
    }
    if (isHighlight) {
      // 如果有子节点高亮，则当前节点高亮
      (node as any)[this.options.highlightKeyName] = true;
      if ((node as any)._children || (node as any).moreData) {
        // 展开当前节点，当前节点是查看更多节点
        this.#expandStack.push(node);
      }
    }
    return isHighlight;
  }
}
