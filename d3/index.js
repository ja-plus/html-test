import { Tree } from './src/Tree';
const data = {
  name: 'Root',
  nodeType: 'root',
  children: [
    {
      name: 'A',
      nodeType: 'parent',
      lineText: '文字',
      children: [
        { name: 'A', lineText: '13次' },
        { name: 'A1', lineText: '2次' },
        { name: 'A2', lineText: '10次' },
        { name: 'A3', lineText: '4次' },
        { name: 'A4', lineText: ' 16次' },
        { name: 'A5', lineText: ' 16次' },
        { name: 'A6', lineText: ' 16次' },
        { name: 'A7', lineText: ' 16次' },
        ...new Array(1000).fill(0).map((it, i) => {
          return { name: '银行存款-' + i };
        }),
      ],
    },
    {
      name: 'B',
      nodeType: 'parent',
      lineText: '19次',
      children: [
        { name: 'B', value: '叶子节点' },
        { name: 'D', value: '叶子节点' },
        { name: 'D1', value: '叶子节点' },
        { name: 'D2', value: '叶子节点' },
        ...new Array(1000).fill(0).map((it, i) => {
          return { name: 'xintuorongzi-' + i };
        }),
      ],
    },
    {
      name: '信托融资',
      nodeType: 'parent',
      children: [
        { name: 'E', value: '叶子节点' },
        { name: 'F', value: '叶子节点' },
        ...new Array(1000).fill(0).map((it, i) => {
          return { name: 'xintuo-' + i };
        }),
      ],
    },
    {
      name: 'A',
      nodeType: 'parent',
      lineText: '8次',
      align: 'left',
      // children: [
      //   { name: '配股', nodeType: 'parent', lineText: '2次', children: [{ name: '3-1' }, { name: '3-2' }] },
      //   { name: 'PEVC', nodeType: 'parent', lineText: '12次', children: [{ name: '3-3' }, { name: '3-4' }] },
      // ],
    },
    {
      name: 'B',
      align: 'left',
      nodeType: 'parent',
    },
  ],
};
const tree = new Tree('.tree', { key: 'name', virtual: true });
tree.setTreeData(data);
tree.addEventListener('leafClick', data => {
  console.log('leaf click', data);
});
tree.addEventListener('lineTextClick', data => {
  console.log('line text click', data);
});
tree.addEventListener('rootClick', data => {
  console.log('root click', data);
});
tree.addEventListener('zoom', ev => {
  console.log('ev:', ev.transform);
});
// tree.highlightNode('配股');

const plus = document.querySelector('#plus');
const reset = document.querySelector('#reset');
const minus = document.querySelector('#minus');
const search = document.querySelector('#search');
const download = document.querySelector('#download');
plus.addEventListener('click', () => {
  tree.scale(1.5);
});
reset.addEventListener('click', () => {
  tree.reset();
});
minus.addEventListener('click', () => {
  tree.scale(1 / 1.5);
});
search.addEventListener('keypress', e => {
  if (e.keyCode === 13) {
    const text = search.value.trim();
    if (text) {
      tree.highlightNode([text]);
    } else {
      tree.resetHighlight();
    }
  }
});
download.addEventListener('click', () => {
  const type = 'png';
  const imgName = 'sss';
  window.saveSvgAsPng(document.querySelector('.tree-svg'), 's.png', {
    backgroundColor: '#fff',
    left: -900,
    top: -300,
  });

  // let serializer = new XMLSerializer();
  // let source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(document.querySelector('.tree-svg'));
  // let image = new Image();
  // image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
  // let canvas = document.createElement('canvas');
  // canvas.width = 1920;
  // canvas.height = 1080;
  // let context = canvas.getContext('2d');
  // context.fillStyle = '#fff';
  // context.fillRect(0, 0, 10000, 10000);
  // image.onload = function () {
  //   context.drawImage(image, 0, 0);
  //   let a = document.createElement('a');
  //   a.download = `${imgName}.${type}`;
  //   a.href = canvas.toDataURL(`image/${type}`);
  //   a.click();
  // };
});
