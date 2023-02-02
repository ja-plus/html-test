import Data from './data.js';
import * as D3 from 'https://cdn.skypack.dev/d3@7';

const Node = {
  width: 200,
  height: 60,
  background: 'rgb(0, 139, 248)',
  r: 8,
  color: 'white',
};
const CenterBackground = 'orange';
const ParentBackground = 'darkblue';
const TransitionDuration = 500;

/* svg */

const $svg = D3.create('svg');
$svg.attr('width', '100%');
$svg.attr('height', '100%');
$svg.attr('viewBox', '-500 -500 1000 1000');

const $wrap = $svg.append('g');
// 拖动和缩放功能
const zoom = D3.zoom()
  .duration(200)
  .scaleExtent([0.1, 10])
  .on('zoom', ev => {
    console.log('zoom', ev.transform);
    $wrap.attr('transform', ev.transform);
  });
$svg
  // .transition()
  // .duration(100)
  .call(zoom);

// setTimeout(() => {
//   zoom.scaleTo($svg, 0.5);
// }, 3000);

const $linkGroup = $wrap.append('g').attr('class', 'link-group');
const $nodeGroup = $wrap.append('g').attr('class', 'node-group');

document.body.appendChild($svg.node());

/* tree */

const tree = D3.tree().nodeSize([Node.height, Node.width]);
let data = D3.hierarchy(Data);

/* draw */

/**
 * @name 绘制
 * @param {Boolean} init 第一次
 */
function draw(init = false) {
  let root = tree(data);

  let nodes = root.descendants();
  let left = root.children.filter(a => /^(1|2)/.test(a.data.name));
  let right = root.children.filter(a => /^(3|4)/.test(a.data.name));

  nodes.forEach(a => ([a.x, a.y] = [a.y, a.x])); // 需要旋转90度

  let leftMiddleOffset = (left[0].y + left[1].y) / 2;
  left.forEach(a => {
    a.descendants().forEach(b => {
      b.x = -b.x;
      b.y -= leftMiddleOffset;
    });
  });
  let rightMiddleOffset = (right[0].y + right[1].y) / 2;
  right.forEach(a => {
    a.descendants().forEach(b => {
      b.y -= rightMiddleOffset;
    });
  });

  let $nodes = $nodeGroup
    .selectAll('.node')
    .data(nodes, d => {
      return d.data.name;
    })
    .join(
      enter => {
        // console.log(enter, 'enter');
        let $gs = enter.append('g');
        $gs
          .append('rect')
          // .transition()
          // .duration(init ? 0 : TransitionDuration)
          .attr('width', Node.width / 2)
          .attr('height', Node.height * 0.66)
          .attr('transform', `translate(${-Node.width / 4}, ${-Node.height * 0.33})`)
          .attr('fill', d => {
            if (d.depth === 0) {
              return CenterBackground;
            } else if (d.children || d._children) {
              return ParentBackground;
            } else {
              return Node.background;
            }
          })
          .attr('rx', Node.r)
          .attr('ry', Node.r);
        $gs
          .append('text')
          .text(d => d.data.name)
          .style('font-size', '20px')
          .attr('fill', Node.color)
          .attr('text-anchor', 'middle')
          .attr('y', Node.height * 0.16);

        return $gs;
      },
      update => {
        console.log('update', update);
        // update.selectAll('rect').attr('fill', 'red');
        return update;
      },
      exit => {
        // 点击收起会进来
        exit
          .transition()
          .duration(init ? 0 : TransitionDuration)
          .attr('opacity', 0)
          .attr('transform', d => `translate(${d.parent.x},${d.parent.y})`)
          .remove();
      },
    )
    .attr('class', 'node')
    .on('click', (e, d) => {
      if (d.data.type === 'more') {
        handle_more_click(e, d);
      } else {
        handle_node_click(e, d);
      }
    });

  // 重置节点展开时，动画的初始位置 FLIP
  $nodes
    .filter(a => a.originX !== undefined && a.originY !== undefined)
    .attr('opacity', 0)
    .attr('transform', d => {
      let transform = `translate(${d.originX || d.x}, ${d.originY || d.y})`;
      delete d.originX;
      delete d.originY;
      return transform;
    });
  // 运行节点展开动画
  $nodes
    .transition()
    .duration(init ? 0 : TransitionDuration)
    .attr('opacity', 1)
    .attr('transform', d => `translate(${d.x}, ${d.y})`);

  let links = root.links();

  $linkGroup
    .selectAll('.link')
    .data(links, d => d.target.data.name)
    .join(
      enter =>
        enter
          .append('path')
          .attr('class', 'link')
          .attr('fill', 'none')
          .attr('stroke', 'gray')
          // .transition()
          // .duration(init ? 0 : TransitionDuration)
          .attr('d', d => {
            let s = d.source;
            let origin = `${s.sourceX || s.x},${s.sourceY || s.y}`;

            return `M ${origin} L ${origin} L ${origin} L ${origin}`;
          }),
      update => update,
      exit =>
        exit
          .transition()
          .duration(init ? 0 : TransitionDuration)
          .attr('d', d => {
            let s = d.source;
            let origin = `${s.x},${s.y}`;
            return `M ${origin} L ${origin} L ${origin} L ${origin}`;
          })
          .remove(),
    )
    .transition()
    .duration(init ? 0 : TransitionDuration)
    .attr('d', d => {
      let s = d.source;
      let t = d.target;
      // console.log('s :>> ', s);
      // console.log('t :>> ', t);

      let mx = (s.x + t.x) / 2;

      return `M ${s.x},${s.y} L ${mx},${s.y} L ${mx},${t.y} L ${t.x},${t.y}`;
    });
}
/**
 * @name 处理结点点击
 * @param {Object} ev 事件
 * @param {Object} d 数据
 */
function handle_node_click(ev, d) {
  // 记录当前节点的位置，用于制作动画
  d.sourceX = d.x;
  d.sourceY = d.y;

  if (d.depth !== 0) {
    if (d.children && !d._children) {
      // 收起
      d._children = d.children;
      d.children = undefined;
      draw();
    } else if (d._children) {
      // 展开
      for (let a of d._children) {
        a.originX = d.x; // 把每个叶子节点的开始位置设置为当前节点父节点的位置，动画从父节点开始
        a.originY = d.y;
      }
      d.children = d._children;
      delete d._children;
      draw();
    }
  }
}

function handle_more_click(ev, d) {
  if (d.depth !== 0) {
    // 修改源数据
    // Data.children[2].children = Data.children[2].children.slice(0, -1); // 查看更多节点移除
    // Data.children[2].children = Data.children[2].children.concat(d.data.data); // 节点添加
    // data = D3.hierarchy(Data); // 数据源转换
    d.parent.children = d.parent.children.slice(0, -1);
    d.parent.data.children = d.parent.data.children.splice(d.parent.data.children.length - 1, 1, d.data.moreData);
    // let moreDataList = D3.hierarchy(d.data.moreData);
    let moreDataList = d.data.moreData.map(item => {
      let node = D3.hierarchy(item);
      node.parent = d.parent;
      node.depth = d.depth;
      node.originX = d.x;
      node.originY = d.y;
      return node;
    });
    d.parent.children.push(...moreDataList);
    draw(); // 重绘
    console.log(data);
  }
}

draw(true);
