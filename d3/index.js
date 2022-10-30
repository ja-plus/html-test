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
          name: '查看更多(3)',
          nodeType: 'more',
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

const dataLeft = {
  name: 'root',
  children: [
    {
      name: '左侧节点',
      value: '左侧',
      children: [
        { name: 'left-1', value: 'left1' },
        { name: 'left-1', value: 'left1' },
      ],
    },
    {
      name: '左侧节点2',
      value: '左侧',
      children: [{ name: 'left-2', value: 'left2' }],
    },
  ],
};
const width = 1500;
const height = 600;
let svg = window.d3.select('body').append('svg').attr('width', width).attr('height', height);
// d3 drag
const g = svg.append('g').attr('fill', '#eee');
const rect = g.append('rect').attr('width', '100%').attr('height', '100%').attr('x', 0).attr('y', 0).attr('opactiy', 0).attr('fill', '#eee');

const dragTemp = { x: 0, y: 0, transform: [width / 2, height / 2] };
const drag = window.d3
  .drag()
  .on('start', function (e) {
    dragTemp.x = e.x;
    dragTemp.y = e.y;
  })
  .on('drag', function (e) {
    let x = e.x - dragTemp.x + dragTemp.transform[0];
    let y = e.y - dragTemp.y + dragTemp.transform[1];
    console.log(x, y);
    window.d3.select(this).attr('transform', `translate(${x},${y})`);
  })
  .on('end', function (e) {
    let transform = window.d3.select(this).attr('transform');
    let [x, y] = transform.match(/\d+/g);
    // console.log(arr, 'arr');
    dragTemp.transform = [+x, +y];
  });
g.call(drag);

const hierarchyData = window.d3.hierarchy(data);
const hierarchyDataLeft = window.d3.hierarchy(dataLeft);
console.log('——————d3.hierarchy(data)——————');
console.log(hierarchyData);
const nodeWidth = 100;
const nodeHeight = 24;
const treeLayout = window.d3
  .tree()
  // .size([height, width / 2]) // 设置tree的大小
  .nodeSize([nodeHeight + 10, nodeWidth * 2])
  .separation((a, b) => {
    // 根据是否为同一父节点设置节点距离比例
    return a.parent === b.parent ? 1 : 2;
  });
console.log('——————treeLayout——————');
console.log(treeLayout);
// const diagonal = window.d3.svg.diagonal().projection(d => [d.y, d.x]);
const nodesData = treeLayout(hierarchyData);
const nodesDataLeft = treeLayout(hierarchyDataLeft);
console.log('——————nodesData——————');
console.log(nodesData);
const links = g
  .attr('transform', `translate(${width / 2},${height / 2})`)
  .selectAll('.links')
  .data(nodesData.descendants().slice(1)) // nodesData.descendants()返回所有节点的数据，利于我们绑定数据，slcie(1)截取root后的全部节点，防止重绘
  .enter()
  .append('path') // 用path画线
  .attr('fill', 'none')
  .attr('stroke', '#313131')
  .attr('stroke-width', 2)
  .attr('d', d => {
    // 通过三次贝塞尔曲线设置连线的弯曲程度。M：move to，即到控制点 C后设置两个控制点及终点
    // return `
    //     M${d.x},${d.y}
    //     C${d.x},${(d.y + d.parent.y) / 2}
    //     ${d.parent.x},${(d.y + d.parent.y) / 2.5}
    //     ${d.parent.x},${d.parent.y}`;
    console.log(d, 'd');
    // if (d.depth === 1) {
    //   // return `M${d.y},${d.x} L${d.y - 150},${d.x} L${d.y - 150},${height / 2} L0,${height / 2}`;
    //   return `M${d.x},${d.y} L${1.5 * d.x - d.parent.x / 2},${d.y} L${1.5 * d.x - d.parent.x / 2},${d.parent.x} L0,${d.parent.x}`;
    // } else {
    let half = (d.y - d.parent.y) / 2;
    return `M${d.y},${d.x} L${d.y - half},${d.x} L${d.y - half},${d.parent.x} L${d.parent.y},${d.parent.x}`;
    // return `M${d.x},${d.y}  L${d.parent.x},${d.parent.y}`;
    // }
    // if (d.depth === 1) {
    //   // return `M${d.y},${d.x} L${d.y - 150},${d.x} L${d.y - 150},${height / 2} L0,${height / 2}`;
    //   return `M${d.y},${d.x} L${d.y - 150},${d.x} L${d.y - 150},${d.parent.x} L0,${d.parent.x}`;
    // } else {
    //   return `M${d.y},${d.x} L${d.y - 150},${d.x} L${d.y - 150},${d.parent.x} L${d.parent.y},${d.parent.x}`;
    // }
  });
// const linksLeft = g
//   .selectAll('.linksLeft')
//   .data(nodesDataLeft.descendants().slice(1)) // nodesData.descendants()返回所有节点的数据，利于我们绑定数据，slcie(1)截取root后的全部节点，防止重绘
//   .enter()
//   .append('path') // 用path画线
//   .attr('fill', 'none')
//   .attr('stroke', '#313131')
//   .attr('stroke-width', 2)
//   .attr('d', d => {
//     // 通过三次贝塞尔曲线设置连线的弯曲程度。M：move to，即到控制点 C后设置两个控制点及终点
//     // return `
//     //     M${d.x},${d.y}
//     //     C${d.x},${(d.y + d.parent.y) / 2}
//     //     ${d.parent.x},${(d.y + d.parent.y) / 2.5}
//     //     ${d.parent.x},${d.parent.y}`;
//     if (d.depth === 1) {
//       return `M${-d.y},${d.x} L0,${height / 2}`;
//     } else {
//       return `M${-d.y},${d.x} L${-d.parent.y},${d.parent.x}`;
//     }
//   });

// 当一个节点中有多个子元素时(比如本例中有text和circle)，我个人喜欢用g作为容器
const nodes = g
  .selectAll('.node')
  .data(nodesData.descendants()) // 同样是获得所有节点，便于数据绑定
  .enter()
  .append('g')
  .attr('transform', d => {
    // if (d.depth === 0) {
    //   return `translate(${d.y}, ${height / 2})`; // 位移
    // } else {
    return `translate(${d.y}, ${d.x})`; // 位移
    // }
  })
  .on('click', () => {
    console.log('click node');
  });
// 画
// nodes
//   .append('rect')
//   .style('fill', '#ccc')
//   .attr('width', nodeWidth)
//   .attr('height', nodeHeight)
//   .attr('rx', 5)
//   .attr('ry', 5)
//   .attr('transform', `translate(-${nodeWidth / 2},-${nodeHeight / 2})`);
const rootNodeWidth = 200;
const rootNodeHeight = 100;
let foreignObject = nodes
  .append('foreignObject')
  .attr('width', d => (d.depth === 0 ? rootNodeWidth : nodeWidth))
  .attr('height', d => (d.depth === 0 ? rootNodeHeight : nodeHeight))
  .attr('transform', d => (d.depth === 0 ? `translate(-${rootNodeWidth / 2},0)` : `translate(0,-${nodeHeight / 2})`))
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
  .text(d => d.data.name);
// // 插入文字
// lineText
nodes
  .append('text')
  .attr('class', 'line-text')
  .attr('transform', `translate(-${nodeWidth},-4)`)
  //   .attr('dx', '1em')
  .text(d => {
    return d.data.lineText;
  });
// nodes.append('text').attr('transform', `translate(0,-${nodeHeight})`).text('line text');
