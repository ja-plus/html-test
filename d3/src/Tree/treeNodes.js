import { treeConfig } from './config.js';

const rootNodeWidth = 150;
const rootNodeHeight = 150;
const parentNodeWidth = 70;
const parentNodeHeight = 24;
const lineOffset = 10; // 偏移量

/**
 * 添加根节点
 * @param {import('d3').Selection} d3Selection
 */
export function addRootNode(d3Selection) {
  const rootForeignObject = d3Selection
    .append('foreignObject')
    .attr('width', rootNodeHeight)
    .attr('height', rootNodeHeight)
    .attr('transform', `translate(-${rootNodeWidth / 2},-20)`);
  const rootNodeDiv = rootForeignObject.append('xhtml:div').attr('class', 'root-node');
  rootNodeDiv.append('xhtml:div').attr('class', 'root-node__icon');
  rootNodeDiv.append('xhtml:div').attr('class', 'root-node__name').text('建设银行及其关联方');
}

/**
 * 添加根节点
 * @param {import('d3').Selection} d3Selection
 */
export function addParentNode(d3Selection) {
  d3Selection
    .append('foreignObject')
    .attr('width', parentNodeWidth)
    .attr('height', parentNodeHeight)
    .attr('transform', `translate(-${parentNodeWidth / 2},-${parentNodeHeight / 2})`)
    .append('xhtml:div')
    .attr('class', 'parent-node')
    .style('background-color', () => {
      return `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
    })
    .append('xhtml:span')
    .text(d => d.data.name);
}

/**
 * 添加叶子节点
 * @param {import('d3').Selection} d3Selection
 */
export function addLeafNode(d3Selection) {
  d3Selection
    .append('foreignObject')
    .attr('width', treeConfig.nodeWidth)
    .attr('height', treeConfig.nodeHeight)
    .attr('transform', d => {
      return `translate(-${d.x < 0 ? treeConfig.nodeWidth : 0},-${treeConfig.nodeHeight / 2})`;
    })
    .append('xhtml:div')
    .attr('class', 'leaf-node')
    .style('text-align', d => d.x < 0 && 'right') // 左侧树，右对齐
    .append('xhtml:div')
    .attr('class', 'node-text')
    .text(d => d.data.name);
}

/**
 * 添加更多节点
 * @param {import('d3').Selection} d3Selection
 */
export function addMoreNode(d3Selection) {
  d3Selection
    .append('foreignObject')
    .attr('width', treeConfig.nodeWidth)
    .attr('height', treeConfig.nodeHeight)
    .attr('transform', d => {
      return `translate(-${d.x < 0 ? treeConfig.nodeWidth : 0},-${treeConfig.nodeHeight / 2})`;
    })
    .append('xhtml:div')
    .attr('class', 'leaf-node more')
    .style('text-align', d => d.x < 0 && 'right') // 左侧树，右对齐
    .append('xhtml:div')
    .attr('class', 'node-text')
    .text(d => d.data.name);
}

/**
 * 添加根节点
 * @param {import('d3').Selection} d3Selection
 */
export function addLineText(d3Selection) {
  d3Selection
    .append('text')
    .attr('class', 'line-text')
    .attr('transform', d => {
      let offset = lineOffset;
      if (!d.data.nodeType) offset *= 3;
      if (d.x < 0) offset = -offset;
      const textStartX = (d.parent.x - d.x) / 2 + offset;
      return `translate(${textStartX},-4)`;
    })
    .attr('text-anchor', d => {
      if (d.x < 0) {
        // 左侧树的数据左对齐
        return 'end';
      }
    })
    .text(d => {
      return d.data.lineText;
    });
}
