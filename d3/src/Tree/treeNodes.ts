import { treeConfig } from './config';
import { Tree } from './index';

const rootNodeWidth = 110;
const rootNodeHeight = 110;
const parentNodeWidth = 70;
const parentNodeHeight = 24;
const lineOffset = 10; // 偏移量

/**
 * 添加根节点
 * @param {import('d3').Selection} d3Selection
 */
export function addRootNode(this: Tree, d3Selection: any) {
  const rootForeignObject = d3Selection
    .append('foreignObject')
    .attr('width', rootNodeHeight)
    .attr('height', rootNodeHeight)
    .attr('transform', `translate(-${rootNodeWidth / 2},-20)`)
    .on('click', (e: any, d: any) => {
      const rootClickCbs = this.eventCallbacks.rootClick;
      rootClickCbs.forEach(cb => {
        cb(d.data, d);
      });
    });
  const rootNodeDiv = rootForeignObject.append('xhtml:div').attr('class', 'root-node');
  rootNodeDiv.append('xhtml:div').attr('class', 'root-node__icon');
  rootNodeDiv
    .append('xhtml:div')
    .attr('class', 'root-node__name')
    .text((d: any) => d.data.name);
}

/**
 * 添加父节点
 * @param {import('d3').Selection} d3Selection
 */
export function addParentNode(this: Tree, d3Selection: any) {
  const fObj = d3Selection
    .append('foreignObject')
    .attr('width', parentNodeWidth)
    .attr('height', parentNodeHeight)
    .attr('transform', `translate(-${parentNodeWidth / 2},-${parentNodeHeight / 2})`)
    .on('click', (e: any, d: any) => {
      this.toggleNode(d);
      this.renderTree();
    });
  fObj
    .append('xhtml:div')
    .attr('class', 'parent-node')
    .style('background-color', () => {
      return `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
    })
    .append('xhtml:span')
    .text((d: any) => d.data.name);
  return fObj;
}

/**
 * 添加叶子节点
 * @param {import('d3').Selection} d3Selection
 */
export function addLeafNode(this: Tree, d3Selection: any) {
  const fObj = d3Selection
    .append('foreignObject')
    .attr('width', treeConfig.nodeWidth)
    .attr('height', treeConfig.nodeHeight)
    .attr('transform', (d: any) => {
      return `translate(-${d.x < 0 ? treeConfig.nodeWidth : 0},-${treeConfig.nodeHeight / 2})`;
    })
    .on('click', (e: any, d: any) => {
      const leafCbs = this.eventCallbacks.leafClick;
      leafCbs.forEach(cb => {
        cb(d.data, d);
      });
    });
  fObj
    .append('xhtml:div')
    .attr('class', 'leaf-node')
    .style('text-align', (d: any) => d.x < 0 && 'right') // 左侧树，右对齐
    .append('xhtml:div')
    .attr('class', 'node-text')
    .text((d: any) => d.data.name);
  return fObj;
}

/**
 * 添加更多节点
 * @param {import('d3').Selection} d3Selection
 */
export function addMoreNode(this: Tree, d3Selection: any) {
  const fObj = d3Selection
    .append('foreignObject')
    .attr('width', treeConfig.nodeWidth)
    .attr('height', treeConfig.nodeHeight)
    .attr('transform', (d: any) => {
      return `translate(-${d.x < 0 ? treeConfig.nodeWidth : 0},-${treeConfig.nodeHeight / 2})`;
    })
    .on('click', (e: any, d: any) => {
      this.showMore(d);
      this.renderTree();
    });
  fObj
    .append('xhtml:div')
    .attr('class', 'leaf-node more')
    .style('text-align', (d: any) => d.x < 0 && 'right') // 左侧树，右对齐
    .append('xhtml:div')
    .attr('class', 'node-text')
    .text((d: any) => d.data.name);
  return fObj;
}

/**
 * 添加根节点
 * @param {import('d3').Selection} d3Selection
 */
export function addLineText(this: Tree, d3Selection: any) {
  return d3Selection
    .append('text')
    .attr('class', 'line-text')
    .attr('transform', (d: any) => {
      let offset = lineOffset;
      if (!d.data.nodeType) offset *= 3;
      if (d.x < 0) offset = -offset;
      const textStartX = (d.parent.x - d.x) / 2 + offset;
      return `translate(${textStartX},-6)`;
    })
    .attr('text-anchor', (d: any) => {
      if (d.x < 0) return 'end'; // 左侧树的数据左对齐
    })
    .text((d: any) => {
      return d.data.lineText;
    })
    .on('click', (e: any, d: any) => {
      const lineTextClickCbs = this.eventCallbacks.lineTextClick;
      lineTextClickCbs.forEach(cb => {
        cb(d.data, d);
      });
    });
}
