import { Key, TreeData } from './types';

/**
 * 增加查看更多按钮
 * @param {TreeData} tree
 */
export function addShowMoreNode(tree: TreeData, size = 5) {
  if (tree.children) {
    if (tree.children.length > size) {
      const treeLen = tree.children.length;
      const tmp = tree.children.slice(0, size);
      const moreData = tree.children.slice(size + 1);
      tmp.push({
        name: `查看更多(${treeLen - size})`,
        nodeType: 'more',
        moreData,
      });
      tree.children = tmp;
    }
    tree.children.forEach(it => addShowMoreNode(it, size));
  }
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
