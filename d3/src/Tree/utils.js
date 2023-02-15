/**
 * @typedef {'root'|'more'|'parent'|'leaf'} NodeType
 */
/**
 * @typedef TreeData
 * @property {string} name
 * @property {string} [lineText]
 * @property {NodeType} [nodeType]
 * @property {TreeData[]} [moreData]
 * @property {TreeData[]} [children]
 */
/**
 *
 * @param {TreeData} tree
 */
export function addShowMoreNode(tree) {
  if (tree.children) {
    if (tree.children.length > 5) {
      const treeLen = tree.children.length;
      const tmp = tree.children.slice(0, 5);
      const moreData = tree.children.slice(6);
      tmp.push({
        name: `查看更多(${treeLen - 5})`,
        nodeType: 'more',
        moreData,
      });
      tree.children = tmp;
    }
    tree.children.forEach(addShowMoreNode);
  }
}

/**
 *
 * @param {TreeData} tree
 * @param {function} callback
 */
export function eachChildren(tree, callback) {
  (function recursion(tree) {
    tree.forEach(child => {
      callback(child);
      if (child.children) {
        recursion(child.children);
      }
    });
  })(tree);
}

export function getParentByName(tree, name, parentKey) {
  let cur = tree;
  while ((cur = cur[parentKey])) {
    if (cur.data.name === name) {
      return cur;
    }
  }
}

export class PositionStore {
  /** @type {Map<string,[number,number]} */
  store = new Map();

  getPosition(d, parentName, parentKey = 'parent') {
    let position = [d[parentKey]?.x || 0, d[parentKey]?.y || 0];
    if (!parentName) return position;
    const storePosition = this.store.get(parentName);
    if (storePosition) return storePosition;
    const parentNode = getParentByName(d, parentName, parentKey);
    if (parentNode) {
      position = [parentNode.x, parentNode.y];
      this.store.set(parentName, position);
    }
    return position;
  }
}
