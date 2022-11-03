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
$svg.call(
  D3.zoom().on('zoom', ev => {
    $wrap.attr('transform', ev.transform);
  }),
);
const $linkGroup = $wrap.append('g').attr('class', 'link-group');
const $nodeGroup = $wrap.append('g').attr('class', 'node-group');

document.body.appendChild($svg.node());

/* tree */

const tree = D3.tree().nodeSize([Node.height, Node.width]);
const data = D3.hierarchy(Data);

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
    .data(nodes, d => d.data.name)
    .join(
      enter => {
        let $gs = enter.append('g');
        $gs
          .append('rect')
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
      update => update,
      exit => {
        exit
          .transition()
          .duration(init ? 0 : TransitionDuration)
          .attr('opacity', 0)
          .attr('transform', d => `translate(${d.parent.x},${d.parent.y})`)
          .remove();
      },
    )
    .attr('class', 'node')
    .on('click', handle_node_click);

  $nodes
    .filter(a => a.originX !== undefined && a.originY !== undefined)
    .attr('opacity', 0)
    .attr('transform', d => {
      let x, y;

      if (d.originX) {
        x = d.originX;
        delete d.originX;
      } else {
        x = d.x;
      }
      if (d.originY) {
        y = d.originY;
        delete d.originY;
      } else {
        y = d.y;
      }

      return `translate(${x}, ${y})`;
    });

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
  // d.sourceX = d.x
  // d.sourceY = d.y

  if (d.depth !== 0) {
    if (d.children) {
      d._children = d.children;
      d.children = undefined;

      draw();
    } else if (d._children) {
      for (let a of d._children) {
        a.originX = a.parent.x;
        a.originY = a.parent.y;
      }

      d.children = d._children;

      draw();
    }
  }
}

draw(true);
