import * as D3 from 'd3';
// import * as d3 from 'https://cdn.skypack.dev/d3@7';
/** @typedef {import('d3')} D3 */
/** @type {D3} */
// const D3 = d3;
import { treeConfig } from './config.js';
import './style.less';
import { addLeafNode, addLineText, addMoreNode, addParentNode, addRootNode } from './treeNodes.js';
import { addShowMoreNode, eachChildren, PositionStore } from './utils.js';

const width = '100%';
const height = 600;

const animationDuration = 1000;
/**
 * 事件类型
 * @typedef {'leafClick'} EventType
 */

export class Tree {
  #$zoom;
  #$linkGroup;
  #$nodeGroup;

  #treeLayout = D3.tree()
    .nodeSize([treeConfig.nodeHeight + 10, treeConfig.nodeWidth * 2]) // 设置tree的大小
    .separation((a, b) => {
      // 根据是否为同一父节点设置节点距离比例
      return a.parent === b.parent ? 1 : 2;
    });

  #dataCopy;
  #hierarchyData;

  /** @type {{[k in EventType]:function[]}} */
  eventCallbacks = {
    leafClick: [],
  };

  constructor(selector) {
    const $svg = D3.select(selector)
      .append('svg')
      .attr('class', 'tree-svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', '-800 -300 1600 600');
    const $wrapGroup = $svg.append('g');
    this.#$zoom = D3.zoom()
      .duration(animationDuration)
      .scaleExtent([0.1, 10])
      .on('zoom', ev => {
        $wrapGroup.attr('transform', ev.transform);
      });
    $svg.call(this.#$zoom);
    this.#$linkGroup = $wrapGroup.append('g').attr('class', 'link-group');
    this.#$nodeGroup = $wrapGroup.append('g').attr('class', 'node-group');
  }

  setTreeData(data) {
    if (!data) throw new TypeError('invalid param data');
    this.#dataCopy = JSON.parse(JSON.stringify(data));
    addShowMoreNode(this.#dataCopy);
    this.#hierarchyData = D3.hierarchy(this.#dataCopy);
    this.renderTree();
  }
  renderTree() {
    const nodesData = this.#treeLayout(this.#hierarchyData);
    const nodes = nodesData.descendants();
    nodes.forEach(a => ([a.x, a.y] = [a.y, a.x])); // 旋转90度
    const left = nodesData.children.slice(0, nodesData.children.length / 2);
    const right = nodesData.children.slice(nodesData.children.length / 2);
    // 左右树分开，并垂直居中
    const leftMiddleOffset = (left[0].y + left[1].y) / 2;
    left.forEach(a => {
      a.descendants().forEach(b => {
        b.x = -b.x;
        b.y -= leftMiddleOffset;
      });
    });
    const rightMiddleOffset = (right[0].y + right[1].y) / 2;
    right.forEach(a => {
      a.descendants().forEach(b => {
        b.y -= rightMiddleOffset;
      });
    });

    const parentPositionStore = new PositionStore();
    // #region 绘制节点
    const allNodesGroup = this.#$nodeGroup
      .selectAll('.node')
      .data(nodes, d => d.data.name)
      .join(
        enter => {
          const g = enter.append('g');
          const rootNodes = g.filter(node => node.depth === 0);
          const parentNodes = g.filter(node => node.data.nodeType === 'parent');
          const moreNodes = g.filter(node => node.data.nodeType === 'more');
          const leafNodes = g.filter(node => !node.data.nodeType);
          addRootNode(rootNodes);
          addParentNode(parentNodes);
          addMoreNode(moreNodes);
          addLeafNode(leafNodes);
          return g;
        },
        update => update,
        exit => {
          // 节点移除，收起动画
          exit
            .transition()
            .duration(animationDuration)
            .attr('opacity', 0)
            .attr('transform', d => {
              const position = parentPositionStore.getPosition(d, d.moveToParent).join(',');
              return `translate(${position})`;
            })
            .remove();
        },
      )
      .attr('class', 'node')
      .on('click', (e, d) => {
        this.#handleNodeClick(d);
        this.renderTree();
      });
    // #endregion

    const lineTextSelection = allNodesGroup.filter(node => node.data.lineText);
    addLineText(lineTextSelection);

    // #region 设置节点位置
    allNodesGroup
      .filter(a => a.nodeStartPosition)
      .attr('opacity', 0.1)
      .attr('transform', d => {
        let transform = `translate(${d.nodeStartPosition[0]}, ${d.nodeStartPosition[1]})`;
        delete d.nodeStartPosition;
        return transform;
      });
    // 节点展开动画
    allNodesGroup
      .transition()
      .duration(animationDuration)
      .attr('opacity', 1)
      .attr('transform', d => `translate(${d.x},${d.y})`);
    // #endregion

    // #region 绘制连接线
    this.#$linkGroup
      .selectAll('.node-link')
      .data(nodesData.links(), d => d.target.data.name) // nodesData.links()，得到连接线数据对象
      .join(
        enter => {
          return enter.append('path').attr('d', d => {
            const lineStartPosition = d.source.lineStartPosition;
            const origin = lineStartPosition ? `${lineStartPosition[0]},${lineStartPosition[1]}` : `${d.source.x},${d.source.y}`;
            return `M ${origin} L ${origin} L ${origin} L ${origin}`;
          });
        },
        update => update,
        exit => {
          exit
            .transition()
            .duration(animationDuration)
            .attr('d', d => {
              let parentPosition = parentPositionStore.getPosition(d.target, d.target.moveToParent, 'source').join(',');
              return `M ${parentPosition} L ${parentPosition} L ${parentPosition} L ${parentPosition}`;
            })
            .remove();
        },
      )
      .attr('class', 'node-link') // 必须加，用于selectAll
      .transition()
      .duration(animationDuration)
      .attr('d', d => {
        let half = (d.target.x - d.source.x) / 2;
        return `M${d.source.x},${d.source.y} L${d.source.x + half},${d.source.y} L${d.source.x + half},${d.target.y} L${d.target.x},${d.target.y}`;
      });
    // #endregion
  }

  #handleNodeClick(d) {
    if (d.data.nodeType === 'more') {
      this.#showMore(d);
    } else if (d.data.nodeType === 'parent') {
      // resetCenter(d);
      this.#toggleNode(d);
    } else {
      const leafCbs = this.eventCallbacks.leafClick;
      leafCbs.forEach(cb => {
        cb(d.data);
      });
    }
  }
  /** 点击查看更多 */
  #showMore(d) {
    const { parent } = d;
    // 去除查看更多节点
    parent.data.children = parent.data.children.slice(0, -1);
    parent.children = parent.children.slice(0, -1);
    // 补充更多节点
    const moreData = d.data.moreData.map(data => {
      const node = D3.hierarchy(data);
      node.depth = d.depth;
      node.parent = d.parent;
      return node;
    });
    parent.children.push(...moreData);
  }
  /** 折叠节点 */
  #toggleNode(d) {
    if (d.depth !== 0) {
      if (d.children && !d._children) {
        // 需要收起
        eachChildren(d.children, child => {
          child.moveToParent = d.data.name;
        });
        d._children = d.children;
        delete d.children;
      } else if (d._children) {
        // 展开
        d.lineStartPosition = [d.x, d.y];
        d.children = d._children;
        eachChildren(d.children, child => {
          child.nodeStartPosition = [d.x, d.y];
          child.lineStartPosition = [d.x, d.y];
        });
        delete d._children;
      }
    }
  }
  /**
   *
   * @param {EventType} eventType
   * @param {function} fun
   */
  addEventListener(eventType, fun) {
    if (typeof fun !== 'function') throw new TypeError('Invalid param fun');
    this.eventCallbacks[eventType].push(fun);
  }
  /**
   *
   * @param {EventType} eventType
   * @param {function} fun
   */
  removeEventListener(eventType, fun) {
    if (typeof fun !== 'function') throw new TypeError('Invalid param fun');
    this.eventCallbacks[eventType] = this.eventCallbacks[eventType].filter(it => it === fun);
  }
}
