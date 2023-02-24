import { BaseType, EnterElement, HierarchyPointLink, HierarchyPointNode, Selection } from 'd3';
import { treeConfig } from './config';
import { Tree } from './index';
import { TreeData } from './types';

const rootNodeWidth = 100;
const rootNodeHeight = 100;
const parentNodeWidth = 70;
const parentNodeHeight = 22;
const lineTextOffset = [15, -4]; // 偏移量

type NodeSelection = Selection<SVGGElement, HierarchyPointNode<TreeData>, SVGGElement, unknown>;
/**
 * 添加根节点
 */
export function addRootNode(this: Tree, d3Selection: NodeSelection) {
  const rootForeignObject = d3Selection
    .append('foreignObject')
    .attr('width', rootNodeHeight)
    .attr('height', rootNodeHeight)
    .attr('class', 'root-node-wrapper')
    .attr('transform', `translate(-${rootNodeWidth / 2},-20)`)
    .on('click', (e, d) => {
      this.dispatchEvent('rootClick', d.data, d);
    });
  const rootNodeDiv = rootForeignObject.append('xhtml:div').attr('class', 'root-node');
  rootNodeDiv
    .append('xhtml:div')
    .attr('class', 'root-node__icon')
    .html(d => d.data.icon || '');
  rootNodeDiv
    .append('xhtml:div')
    .attr('class', 'root-node__name')
    .text(d => d.data.name);
}

/**
 * 添加父节点
 */
export function addParentNode(this: Tree, d3Selection: NodeSelection) {
  const fObj = d3Selection
    .append('foreignObject')
    .attr('width', parentNodeWidth)
    .attr('height', parentNodeHeight)
    .attr('class', 'parent-node-wrapper')
    .attr('transform', `translate(-${parentNodeWidth / 2},-${parentNodeHeight / 2})`)
    .on('click', (e, d) => {
      this.toggleNode(d);
      this.updateTreeNodePosition();
      this.renderTree();
    });
  fObj
    .append('xhtml:div')
    .attr('class', 'parent-node')
    .style('background-color', d => {
      if (d.data.backgroundColor) return d.data.backgroundColor;
      else {
        // 继承祖先节点背景颜色
        let ancestor: HierarchyPointNode<TreeData> | null = d;
        while ((ancestor = ancestor.parent)) {
          if (ancestor.data.backgroundColor) return ancestor.data.backgroundColor;
        }
      }
      return `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
    })
    .append('xhtml:span')
    .attr('class', 'text')
    .text(d => d.data.name);
  return fObj;
}

/**
 * 添加叶子节点
 */
export function addLeafNode(this: Tree, d3Selection: NodeSelection) {
  const fObj = d3Selection
    .append('foreignObject')
    .attr('width', treeConfig.nodeWidth)
    .attr('height', treeConfig.nodeHeight)
    .attr('class', 'leaf-node-wrapper')
    .attr('transform', d => {
      return `translate(-${d.x < 0 ? treeConfig.nodeWidth : 0},-${treeConfig.nodeHeight / 2})`;
    })
    .on('click', (e, d) => {
      this.dispatchEvent('leafClick', d.data, d);
    });
  fObj
    .append('xhtml:div')
    .attr('class', 'leaf-node')
    .attr('title', d => d.data.name)
    .style('text-align', d => d.x < 0 && 'right') // 左侧树，右对齐
    .append('xhtml:span')
    .attr('class', 'node-text')
    .text(d => d.data.name);
  return fObj;
}

/**
 * 添加查看更多节点
 */
export function addMoreNode(this: Tree, d3Selection: NodeSelection) {
  const fObj = d3Selection
    .append('foreignObject')
    .attr('width', treeConfig.nodeWidth)
    .attr('height', treeConfig.nodeHeight)
    .attr('class', 'leaf-node-wrapper')
    .attr('transform', d => {
      return `translate(-${d.x < 0 ? treeConfig.nodeWidth : 0},-${treeConfig.nodeHeight / 2})`;
    })
    .on('click', (e, d) => {
      this.showMore(d);
      this.updateTreeNodePosition();
      this.renderTree();
    });
  fObj
    .append('xhtml:div')
    .attr('class', 'leaf-node more')
    .style('text-align', d => d.x < 0 && 'right') // 左侧树，右对齐
    .append('xhtml:div')
    .attr('class', 'node-text')
    .text(d => d.data.name);
  return fObj;
}

/**
 * 添加线上的文字
 */
export function addLineText(this: Tree, d3Selection: NodeSelection) {
  return d3Selection
    .append('text')
    .attr('class', 'line-text')
    .attr('transform', d => {
      let offsetX = lineTextOffset[0];
      if (!d.data.nodeType || d.data.nodeType === 'leaf') offsetX *= 3;
      if (d.x < 0) offsetX = -offsetX;
      const textStartX = ((d.parent?.x || 0) - d.x) * (1 - treeConfig.linkTuringPointRatio) + offsetX;
      return `translate(${textStartX},${lineTextOffset[1]})`;
    })
    .attr('text-anchor', d => {
      if (d.x < 0) return 'end'; // 左侧树的数据左对齐
      return '';
    })
    .text(d => {
      return d.data.lineText || '';
    })
    .on('click', (e, d) => {
      this.dispatchEvent('lineTextClick', d.data, d);
    });
}

/**enter 连接线 */
export function addLink(this: Tree, d3Selection: Selection<EnterElement, HierarchyPointLink<TreeData>, SVGGElement, unknown>) {
  return d3Selection
    .append('path')
    .attr('opacity', 1)
    .attr('d', (d: any) => {
      const lineStartPosition = d.target.lineStartPosition; // 指定了曲线初始化位置
      let result = '';
      if (lineStartPosition?.length === 2) {
        const origin = lineStartPosition.join(',');
        result = `M${origin} L${origin} L${origin} L${origin}`;
      } else if (lineStartPosition?.length === 4) {
        const [sourceX, sourceY, targetX, targetY] = lineStartPosition;
        const half = (d.target.x - d.source.x) * treeConfig.linkTuringPointRatio;
        result = `M${sourceX},${sourceY} L${sourceX + half},${sourceY} L${sourceX + half},${targetY} L${targetX},${targetY}`;
      } else {
        const origin = `${d.source.x},${d.source.y}`;
        result = `M${origin} L${origin} L${origin} L${origin}`;
      }
      delete d.target.lineStartPosition;
      return result;
    });
}
/**exit 查看更多更多节点 */
export function fadeOutNode(this: Tree, d3Selection: Selection<BaseType, HierarchyPointNode<TreeData>, SVGGElement, unknown>) {
  return d3Selection.transition().duration(treeConfig.animationDuration).attr('opacity', 0).remove();
}
/** exit 查看更多连接线 */
export function fadeOutLink(this: Tree, d3Selection: Selection<BaseType, HierarchyPointLink<TreeData>, SVGGElement, unknown>) {
  return d3Selection.transition().duration(treeConfig.animationDuration).attr('opacity', 0).remove();
}
