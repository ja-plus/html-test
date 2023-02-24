export const treeConfig = Object.freeze({
  nodeWidth: 120,
  nodeHeight: 18,
  /**折线转折点位置比例 */
  linkTuringPointRatio: 1 / 2,
  animationDuration: 500,
  animationDurationFast: 200,
  className: {
    svg: 'tree-svg',
    rootGroup: 'main-group',
    linksGroup: 'links-group',
    nodesGroup: 'nodes-group',
    nodeGroup: 'node',
    linkGroup: 'node-link',
  },
} as const);
