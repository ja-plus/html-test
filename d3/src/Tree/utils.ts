import * as D3 from 'd3';
import { HierarchyNode, HierarchyPointNode } from 'd3';
import { Key, TreeData } from './types';

/**
 * 增加查看更多按钮
 * @param {HierarchyNode<TreeData>} tree
 */
export function addShowMoreNode(tree: HierarchyNode<TreeData>, size = 5) {
  if (tree.children) {
    if (tree.children.length > size) {
      const treeLen = tree.children.length;
      const visibleNode = tree.children.slice(0, size);
      const moreData = tree.children.slice(size);
      if (moreData.length === 1 && moreData[0].data.nodeType === 'more') return;
      const showMoreNode = D3.hierarchy<TreeData>({
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
    tree.children.forEach(it => addShowMoreNode(it, size));
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
