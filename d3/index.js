import { Tree } from './src/Tree';
const data = {
  name: '建设银行及其关联方',
  nodeType: 'root',
  children: [
    {
      name: '银行存款',
      nodeType: 'parent',
      lineText: '借款52次',
      children: [
        { name: '兴业银行', lineText: '13次' },
        { name: '中国银行', lineText: '2次' },
        { name: '建设银行', lineText: '10次' },
        { name: '招商银行', lineText: '4次' },
        { name: '上海银行', lineText: ' 16次' },
        { name: '上海银行1', lineText: ' 16次' },
        { name: '上海银行2', lineText: ' 16次' },
        { name: '上海银行3', lineText: ' 16次' },
        ...new Array(1000).fill(0).map((it, i) => {
          return { name: '银行存款-' + i };
        }),
      ],
    },
    {
      name: '信拖融资',
      nodeType: 'parent',
      lineText: '融资19次',
      children: [
        { name: '中国对外经济贸易信托有限公司', value: '叶子节点' },
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
      name: '并购信息',
      nodeType: 'parent',
      lineText: '卖方8次',
      align: 'left',
      children: [
        { name: '配股', nodeType: 'parent', lineText: '2次', children: [{ name: '3-1' }, { name: '3-2' }] },
        { name: 'PEVC', nodeType: 'parent', lineText: '12次', children: [{ name: '3-3' }, { name: '3-4' }] },
      ],
    },
    {
      name: '股权融资',
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
