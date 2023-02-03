import * as d3 from 'https://cdn.skypack.dev/d3@7';
/** @type {import('d3')} */
const D3 = d3;
// import * as D3 from 'd3';
const data = {
  name: '建设银行及其关联方',
  children: [
    {
      name: '银行存款',
      lineText: '借款52次',
      children: [
        {
          name: '兴业银行',
          lineText: '13次',
        },
        {
          name: '中国银行',
          lineText: '2次',
        },
        {
          name: '建设银行',
          lineText: '10次',
        },
        {
          name: '招商银行',
          lineText: '4次',
        },
        {
          name: '上海银行',
          lineText: ' 16次',
        },
        {
          name: '上海银行1',
          lineText: ' 16次',
        },
        {
          name: '上海银行2',
          lineText: ' 16次',
        },
        {
          name: '上海银行3',
          lineText: ' 16次',
        },
      ],
    },
    {
      name: '信拖融资',
      lineText: '融资19次',
      children: [
        {
          name: 'C',
          value: '叶子节点',
        },
        {
          name: 'D',
          value: '叶子节点',
        },
        {
          name: 'D1',
          value: '叶子节点',
        },
        {
          name: 'D2',
          value: '叶子节点',
        },
      ],
    },
    {
      name: '二级节点3',
      children: [
        {
          name: 'E',
          value: '叶子节点',
        },
        {
          name: 'F',
          value: '叶子节点',
        },
      ],
    },
    {
      name: '二级节点4',
      lineText: '卖方8次',
      children: [
        {
          name: '深圳市万科发展有限公司',
          lineText: '2次',
        },
      ],
    },
  ],
};

let dataCopy = JSON.parse(JSON.stringify(data));
// 添加查看更多节点
(function recursion(tree) {
  if (tree.children) {
    if (tree.children.length > 5) {
      const treeLen = tree.children.length;
      tree.children = tree.children.slice(0, 5);
      tree.children.push({
        name: `查看更多(${treeLen - 5})`,
        nodeType: 'more',
        moreData: tree.children.slice(6),
      });
    }
    tree.children.forEach(recursion);
  }
})(dataCopy);

const width = 800;
const height = 600;
const nodeWidth = 100;
const nodeHeight = 24;
const rootNodeWidth = 150;
const rootNodeHeight = 150;
const animationDuration = 500;

const svg = D3.select('body')
  .append('svg')
  .attr('class', 'tree-svg')
  .attr('width', width)
  .attr('height', height)
  .attr('viewBox', '-500 -300 1000 600');
const wrap = svg.append('g');

const zoom = D3.zoom()
  .duration(animationDuration)
  .scaleExtent([0.1, 10])
  .on('zoom', ev => {
    wrap.attr('transform', ev.transform);
  });
svg.call(zoom);

const treeLayout = D3.tree()
  .nodeSize([nodeHeight + 10, nodeWidth * 2]) // 设置tree的大小
  .separation((a, b) => {
    // 根据是否为同一父节点设置节点距离比例
    return a.parent === b.parent ? 1 : 2;
  });

const linkWrap = wrap.append('g').attr('class', 'link-group');
const nodeWrap = wrap.append('g').attr('class', 'node-group');
const hierarchyData = D3.hierarchy(dataCopy);

/**
 * 树图渲染
 */
function renderTree() {
  const nodesData = treeLayout(hierarchyData);
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

  // #region 绘制节点
  const nodesGroup = nodeWrap
    .selectAll('.node')
    .data(nodes, d => d.data.name)
    .join(
      enter => {
        const g = enter.append('g');
        // root 根节点
        const rootForeignObject = g
          .filter(node => node.depth === 0)
          .append('foreignObject')
          .attr('width', rootNodeHeight)
          .attr('height', rootNodeHeight)
          .attr('transform', `translate(-${rootNodeWidth / 2},-20)`);
        const rootNodeDiv = rootForeignObject.append('xhtml:div').attr('class', 'root-node');
        rootNodeDiv.append('xhtml:div').attr('class', 'root-node__icon');
        rootNodeDiv.append('xhtml:div').attr('class', 'root-node__name').text('建设银行及其关联方');

        // 其他节点
        const typeNode = g
          .filter(node => node.depth === 1)
          .append('foreignObject')
          .attr('width', nodeWidth)
          .attr('height', nodeHeight)
          .attr('transform', `translate(-${nodeWidth / 2},-${nodeHeight / 2})`)
          .append('xhtml:div')
          .attr('class', 'tree-node')
          .style('background-color', d => {
            return `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
          })
          .append('xhtml:span')
          .text(d => d.data.name);
        const leafNode = g
          .filter(node => node.depth > 1)
          .append('foreignObject')
          .attr('width', nodeWidth)
          .attr('height', nodeHeight)
          .attr('transform', `translate(0,-${nodeHeight / 2})`)
          .append('xhtml:div')
          .attr('class', d => {
            if (d.data.nodeType === 'more') return 'leaf-node more';
            else return 'leaf-node';
          })
          .append('xhtml:span')
          .text(d => d.data.name);
        return g;
      },
      update => update,
      exit => {
        // 节点移除，收起动画
        exit
          .transition()
          .duration(animationDuration)
          .attr('opacity', 0)
          .attr('transform', d => `translate(${d.parent.x},${d.parent.y})`)
          .remove();
      },
    )
    .attr('class', 'node')
    .on('click', (e, d) => {
      if (d.data.nodeType === 'more') {
        showMore(d.parent.data.name);
      } else {
        toggleNode(e, d);
      }
    });
  // #endregion

  // 插入文字
  nodesGroup
    .append('text')
    .attr('class', 'line-text')
    .attr('transform', `translate(-${nodeWidth},-4)`)
    .text(d => {
      return d.data.lineText;
    });

  // #region 设置节点位置
  nodesGroup
    .filter(a => a.originX && a.originY)
    .attr('opacity', 0.1)
    .attr('transform', d => {
      let transform = `translate(${d.originX || d.x}, ${d.originY || d.y})`;
      delete d.originX;
      delete d.originY;
      return transform;
    });
  // 节点展开动画
  nodesGroup
    .transition()
    .duration(animationDuration)
    .attr('opacity', 1)
    .attr('transform', d => `translate(${d.x},${d.y})`);
  // #endregion

  // #region 绘制连接线
  linkWrap
    .selectAll('.node-link')
    .data(nodesData.links(), d => d.target.data.name) // nodesData.links()，得到连接线数据对象
    .join(
      enter => {
        return enter.append('path').attr('d', d => {
          let origin = `${d.source.sourceX || d.source.x},${d.source.sourceY || d.source.y}`;
          return `M ${origin} L ${origin} L ${origin} L ${origin}`;
        });
      },
      update => update,
      exit => {
        exit
          .transition()
          .duration(animationDuration)
          .attr('d', d => {
            let origin = `${d.source.x},${d.source.y}`;
            return `M ${origin} L ${origin} L ${origin} L ${origin}`;
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

renderTree();
/** 折叠节点 */
function toggleNode(e, d) {
  d.sourceX = d.x; // 记录连接线的起始位置
  d.sourceY = d.y;
  if (d.depth !== 0) {
    if (d.children && !d._children) {
      // 需要收起
      d._children = d.children;
      delete d.children;
    } else if (d._children) {
      // 展开
      d._children.forEach(a => {
        a.originX = d.x; // 把每个叶子节点的开始位置设置为当前节点父节点的位置，动画从父节点开始
        a.originY = d.y;
      });
      d.children = d._children;
      delete d._children;
    }
    renderTree();
  }
}
function showMore(name) {
  let children = [];
  (function recursion(tree) {
    if (tree.name === name) {
      tree.children = children;
      return;
    }
    if (tree.children) {
      tree.children.forEach(recursion);
    }
  })(dataCopy);
  renderTree();
}
