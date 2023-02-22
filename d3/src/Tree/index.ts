import * as D3 from 'd3';
import { HierarchyNode, HierarchyPointNode } from 'd3';
// import * as d3 from 'https://cdn.skypack.dev/d3@7';
import { treeConfig } from './config';
import './style.less';
import { addLeafNode, addLineText, addLink, addMoreNode, addParentNode, addRootNode, exitMoreNode, exitMoreNodeLink } from './treeNodes';
import { ConsOption, EventCb, EventType, TreeData } from './types';
import { addShowMoreNode, eachChildren, keyGen, PositionStore, separateTree } from './utils';

/**
 * d3 tree
 */
export class Tree {
  selector: string;
  /** 是否处于高亮模式,是将调整所有节点opacity */
  #highlightMode = false;
  #$svg;
  #$wrapGroup;
  #$linkGroup;
  #$nodeGroup;
  #$zoom = D3.zoom().duration(treeConfig.animationDuration).scaleExtent([0.2, 10]);

  #treeLayout = D3.tree<TreeData>()
    .nodeSize([treeConfig.nodeHeight, treeConfig.nodeWidth * 2]) // 设置tree的大小
    .separation((a, b) => {
      // 根据是否为同一父节点设置节点距离比例
      if (a.parent !== b.parent) return 2;
      if (!a.data.nodeType || a.data.nodeType === 'more') return 1.2; // 叶子节点间距
      return 1.5;
    });

  #dataCopy: any;
  #hierarchyData: HierarchyNode<TreeData> = D3.hierarchy({} as TreeData);
  #nodes!: HierarchyPointNode<TreeData>;

  eventCallbacks: { [k in EventType]: EventCb[] } = {
    leafClick: [],
    lineTextClick: [],
    rootClick: [],
    zoom: [],
  };
  #option: ConsOption = {
    key: 'id',
    width: '100%',
    height: '100%',
  };
  get key() {
    return this.#option.key;
  }
  /**
   *
   * @param {string} selector 选择器
   * @param {object} option
   * @param {string|function} option.key 唯一值的键
   */
  constructor(selector: string, option?: Partial<ConsOption>) {
    this.selector = selector;
    Object.assign(this.#option, option || {});

    this.#$svg = D3.select(selector).append('svg').attr('width', this.#option.width).attr('height', this.#option.height).attr('class', 'tree-svg');
    // .attr('viewBox', '-800 -300 1600 600');
    this.#$wrapGroup = this.#$svg.append('g');
    this.#$zoom.on('zoom', ev => {
      this.#$wrapGroup.attr('transform', ev.transform);
      this.dispatchEvent('zoom', ev);
    });
    this.#$svg.call(this.#$zoom as any);
    this.#$linkGroup = this.#$wrapGroup.append('g').attr('class', 'link-group');
    this.#$nodeGroup = this.#$wrapGroup.append('g').attr('class', 'node-group');
    this.setTreeToCenter();
  }

  setTreeData(data: TreeData) {
    if (!data) throw new TypeError('Invalid param data');
    this.#dataCopy = window.structuredClone(data);
    this.#initHierarchyData();
    this.renderTree();
  }
  #initHierarchyData() {
    const dataClone = window.structuredClone(this.#dataCopy);
    this.#hierarchyData = D3.hierarchy<TreeData>(dataClone);
    addShowMoreNode(this.#hierarchyData);
  }

  renderTree() {
    this.#nodes = this.#treeLayout(this.#hierarchyData);
    this.#nodes.each(a => ([a.x, a.y] = [a.y, a.x])); // 旋转90度
    separateTree(this.#nodes); // left tree | right tree

    this.#$svg.attr('class', () => {
      const classList = ['tree-svg'];
      if (this.#highlightMode) classList.push('highlight-mode');
      return classList.join(' ');
    });

    const parentPositionStore = new PositionStore(this.key);
    // #region 绘制节点
    const allNodesGroup = this.#$nodeGroup
      .selectAll('.node')
      .data(this.#nodes.descendants(), (d: any) => keyGen(d.data, this.key))
      .join(
        enter => {
          const g = enter.append('g');
          const rootNodes = g.filter(node => node.depth === 0);
          const parentNodes = g.filter(node => node.data.nodeType === 'parent');
          const moreNodes = g.filter(node => node.data.nodeType === 'more');
          const leafNodes = g.filter(node => !node.data.nodeType);
          const lineTextNodes = g.filter(node => Boolean(node.data.lineText));
          addRootNode.call(this, rootNodes);
          addParentNode.call(this, parentNodes);
          addMoreNode.call(this, moreNodes);
          addLeafNode.call(this, leafNodes);
          addLineText.call(this, lineTextNodes);
          return g;
        },
        update => update,
        exit => {
          // 节点移除，收起动画
          const moreNode = exit.filter(d => d.data.nodeType === 'more');
          exitMoreNode.call(this, moreNode);
          exit
            .filter(d => d.data.nodeType !== 'more')
            .transition()
            .duration(treeConfig.animationDuration)
            .attr('opacity', 0)
            .attr('transform', (d: any) => {
              const position = parentPositionStore.getPosition(d, d.moveToParent).join(',');
              return `translate(${position})`;
            })
            .remove();
        },
      )
      .attr('class', (d: any) => {
        const classList = ['node'];
        // 一级节点一直高亮
        if ((this.#highlightMode && d.depth < 2) || d.highlight) classList.push('highlight');
        return classList.join(' ');
      });
    // #endregion

    // #region 设置节点位置
    allNodesGroup
      .filter((d: any) => d.nodeStartPosition)
      .attr('opacity', 0)
      .attr('transform', (d: any) => {
        const transform = `translate(${d.nodeStartPosition[0]}, ${d.nodeStartPosition[1]})`;
        delete d.nodeStartPosition;
        return transform;
      });
    // 节点展开动画
    allNodesGroup
      .transition()
      .duration(treeConfig.animationDuration)
      .attr('opacity', 1)
      .attr('transform', d => `translate(${d.x},${d.y})`);
    // #endregion

    // #region 绘制连接线
    this.#$linkGroup
      .selectAll('.node-link')
      .data(this.#nodes.links(), (d: any) => keyGen(d.target.data, this.key)) // nodesData.links()，得到连接线数据对象
      .join(
        enter => {
          return addLink.call(this, enter);
        },
        update => update,
        exit => {
          // 点击“查看更多”节点不需要移出动画
          const moreNodeLink = exit.filter(d => d.target.data.nodeType === 'more');
          exitMoreNodeLink.call(this, moreNodeLink);

          exit
            .filter(d => d.target.data.nodeType !== 'more')
            .transition()
            .duration(treeConfig.animationDuration)
            .attr('d', (d: any) => {
              const parentPosition = parentPositionStore.getPosition(d.target, d.target.moveToParent, 'source').join(',');
              return `M ${parentPosition} L ${parentPosition} L ${parentPosition} L ${parentPosition}`;
            })
            .remove();
        },
      )
      .attr('class', (d: any) => {
        const classList = ['node-link']; // 必须加，用于selectAll
        if ((this.#highlightMode && d.target.depth < 2) || d.target.highlight) classList.push('highlight');
        return classList.join(' ');
      })
      .transition()
      .duration(treeConfig.animationDuration)
      .attr('d', d => {
        const half = (d.target.x - d.source.x) * treeConfig.linkTuringPointRatio;
        return `M${d.source.x},${d.source.y} L${d.source.x + half},${d.source.y} L${d.source.x + half},${d.target.y} L${d.target.x},${d.target.y}`;
      });
    // #endregion
  }

  /** 点击查看更多 */
  showMore(d: any) {
    const { parent } = d;
    // 去除"查看更多"节点
    parent.children = parent.children.slice(0, -1);
    eachChildren(d.moreData, (child: any) => {
      child.nodeStartPosition = [d.x, d.y]; //新节点从父节点移出
      child.lineStartPosition = [d.parent.x, d.parent.y, d.x, d.y]; // 曲线开始与结束位置
    });
    parent.children.push(...d.moreData);
  }
  /** 折叠节点 */
  toggleNode(d: any) {
    if (d.depth !== 0) {
      if (d.children && !d._children) {
        // 需要收起
        eachChildren(d.children, (child: any) => {
          child.moveToParent = keyGen(d.data, this.key);
        });
        d._children = d.children;
        delete d.children;
        this.translateTo(d.parent.x, d.parent.y); // 重设中心
      } else if (d._children) {
        // 展开
        d.lineStartPosition = [d.x, d.y];
        d.children = d._children;
        eachChildren(d.children, (child: any) => {
          child.nodeStartPosition = [d.x, d.y];
          child.lineStartPosition = [d.x, d.y];
        });
        delete d._children;
        this.translateTo(d.x, d.y); // 重设中心
      }
    }
  }
  /**
   *
   * @param {EventType} eventType
   * @param {function} fun
   */
  addEventListener(eventType: EventType, fun: EventCb) {
    if (typeof fun !== 'function') throw new TypeError('Invalid param fun');
    this.eventCallbacks[eventType].push(fun);
  }
  /**
   *
   * @param {EventType} eventType
   * @param {function} fun
   */
  removeEventListener(eventType: EventType, fun: EventCb) {
    if (typeof fun !== 'function') throw new TypeError('Invalid param fun');
    this.eventCallbacks[eventType] = this.eventCallbacks[eventType].filter(it => it === fun);
  }
  /**
   * 触发事件
   */
  dispatchEvent(eventType: EventType, ...args: any[]) {
    const callbacks = this.eventCallbacks[eventType];
    callbacks.forEach(cb => {
      cb(...args);
    });
  }
  /**
   * 高亮单元格
   * @param {string} id
   */
  highlightNode(id: string) {
    const recursion = (node: HierarchyNode<TreeData>): boolean => {
      if (keyGen(node.data, this.key) === id) return true;
      let isHighlight = false;
      if (node.children) {
        for (const childNode of node.children) {
          const result = recursion(childNode);
          if (result) {
            (childNode as any).highlight = true;
          } else if ((childNode as any).highlight) {
            delete (childNode as any).highlight;
          }
          isHighlight = isHighlight || result;
        }
      }
      return isHighlight;
    };
    recursion(this.#hierarchyData);
    this.#highlightMode = true;
    this.renderTree();
  }
  /** 取消高亮模式 */
  resetHighlight() {
    this.#highlightMode = false;
    // 删除所有highlight
    const recursion = (node: HierarchyNode<TreeData>) => {
      node.children?.forEach(childNode => {
        delete (childNode as any).highlight;
        recursion(childNode);
      });
    };
    recursion(this.#hierarchyData);
  }
  /**
   * @param {number} num 缩放倍数
   */
  scale(num: number) {
    this.#$zoom.scaleBy(this.#$svg.transition().duration(treeConfig.animationDurationFast) as any, num);
  }
  /**
   * @param {number} num 缩放倍数
   */
  scaleTo(num: number) {
    this.#$zoom.scaleTo(this.#$svg.transition().duration(treeConfig.animationDurationFast) as any, num);
  }

  translateTo(x: number, y: number, origin?: [number, number]) {
    this.#$zoom.translateTo(this.#$svg.transition().duration(treeConfig.animationDurationFast) as any, x, y, origin);
  }
  setTreeToCenter() {
    const svg = document.querySelector(this.selector);
    if (svg) {
      const { width, height } = svg.getBoundingClientRect();
      this.translateTo(0, 0, [width / 2, height / 2]);
    }
  }
  reset() {
    const svg = document.querySelector(this.selector);
    const { width, height } = svg?.getBoundingClientRect() || { width: 800, height: 600 };

    this.#$zoom.transform(
      this.#$svg.transition().duration(treeConfig.animationDurationFast) as any,
      D3.zoomIdentity.translate(width / 2, height / 2).scale(1),
    );
    // this.resetHighlight();
    this.#highlightMode = false;
    this.#initHierarchyData();

    // addShowMoreNode(this.#hierarchyData); // 重新添加产
    // 将节点移除
    this.#$nodeGroup.selectAll('.node').remove();
    this.#$linkGroup.selectAll('.node-link').remove();
    this.renderTree();
  }
}
