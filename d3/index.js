/** @type {import('d3')} */
import * as D3 from 'https://cdn.skypack.dev/d3@7';
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
          name: '上海银行',
          lineText: ' 16次',
        },
        {
          name: '上海银行',
          lineText: ' 16次',
        },
        {
          name: '上海银行',
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
          name: 'D1',
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
let svg = D3.select('body')
  .append('svg')
  .attr('class', 'tree-svg')
  .attr('width', width)
  .attr('height', height)
  .attr('viewBox', '-500 -500 1000 1000');
const wrap = svg.append('g');

const zoom = D3.zoom()
  .duration(200)
  .scaleExtent([0.1, 10])
  .on('zoom', ev => {
    wrap.attr('transform', ev.transform);
  });
svg.call(zoom);

const nodeWidth = 100;
const nodeHeight = 24;
const rootNodeWidth = 150;
const rootNodeHeight = 150;
const treeLayout = D3.tree()
  .nodeSize([nodeHeight + 10, nodeWidth * 2]) // 设置tree的大小
  .separation((a, b) => {
    // 根据是否为同一父节点设置节点距离比例
    return a.parent === b.parent ? 1 : 2;
  });

const linkWrap = wrap.append('g').attr('class', 'link-g');
const nodeWrap = wrap.append('g').attr('class', 'node-g');

function renderTree() {
  const hierarchyData = D3.hierarchy(dataCopy);
  // const hierarchyDataLeft = D3.hierarchy(dataLeft);
  console.log('——————d3.hierarchy(data)——————');
  console.log(hierarchyData);
  // const diagonal = D3.svg.diagonal().projection(d => [d.y, d.x]);
  const nodesData = treeLayout(hierarchyData);
  // const nodesDataLeft = treeLayout(hierarchyDataLeft);

  const nodes = nodesData.descendants();
  console.log('——————nodesData——————');
  console.log(nodesData);

  const links = linkWrap
    .selectAll('.links')
    .data(nodesData.links(), d => d.target.data.name) // nodesData.links()，得到连接线数据对象
    .join(
      enter => {
        enter
          .append('path') // 用path画线
          .attr('class', 'node-link')
          .attr('d', d => {
            let half = (d.source.y - d.target.y) / 2;
            return `M${d.source.y},${d.source.x} L${d.source.y - half},${d.source.x} L${d.source.y - half},${d.target.x} L${d.target.y},${
              d.target.x
            }`;
          });
      },
      update => update,
      exit =>
        exit
          .transition()
          .duration(200)
          .attr('d', d => {
            let origin = `${d.source.x},${d.source.y}`;
            return `M ${origin} L ${origin} L ${origin} L ${origin}`;
          })
          .remove(),
    );
  const nodesGroup = nodeWrap
    .selectAll('.node')
    .data(nodes, d => d.data.name) // 同样是获得所有节点，便于数据绑定
    .join(
      enter => {
        let g = enter.append('g').attr('transform', d => {
          return `translate(${d.y}, ${d.x})`; // 位移
        });
        let root = g.filter(node => node.depth === 0);
        root.append('xhtml:div').attr('class', 'root-node-icon');
        root.append('xhtml:div').attr('class', 'root-node-name').text('建设银行及其关联方');
        // leaf
        g.append('foreignObject')
          .attr('width', d => (d.depth === 0 ? rootNodeWidth : nodeWidth))
          .attr('height', d => (d.depth === 0 ? rootNodeHeight : nodeHeight))
          .attr('transform', d => (d.depth === 0 ? `translate(-${rootNodeWidth / 2},-${rootNodeHeight / 3})` : `translate(0,-${nodeHeight / 2})`))
          .append('xhtml:div')
          .attr('class', d => {
            if (d.depth === 0) {
              return 'root-node';
            } else if (d.depth === 1) {
              return 'tree-node';
            } else if (d.depth === 2) {
              if (d.data.nodeType === 'more') return 'leaf-node more';
              else return 'leaf-node';
            }
          })
          .style('background-color', d => {
            if (d.depth === 1) {
              return `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
            }
          })
          .append('xhtml:span')
          .text(d => {
            if (d.depth > 0) return d.data.name;
          });
        // return g;
      },
      update => update,
    )
    .on('click', (e, d) => {
      if (d.data.nodeType === 'more') {
        showMore(d.parent.data.name);
      } else {
        toggleNode(e, d);
      }
    });

  // const rootNodes = D3.select('.root-node');
  // rootNodes.append('xhtml:div').attr('class', 'root-node-icon');
  // rootNodes.append('xhtml:div').attr('class', 'root-node-name').text('建设银行及其关联方');
  // 插入文字
  // lineText
  nodesGroup
    .append('text')
    .attr('class', 'line-text')
    .attr('transform', `translate(-${nodeWidth},-4)`)
    .text(d => {
      return d.data.lineText;
    });
  // nodes.append('text').attr('transform', `translate(0,-${nodeHeight})`).text('line text');
}

renderTree();

function toggleNode(e, d) {
  if (d.depth !== 0) {
    if (d.children && !d._children) {
      // 需要收起
      d._children = d.children;
      delete d.children;
    } else if (d._children) {
      // 展开
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
