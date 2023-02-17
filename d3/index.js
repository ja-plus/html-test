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
      ],
    },
    {
      name: '信拖融资',
      nodeType: 'parent',
      lineText: '融资19次',
      children: [
        { name: 'C', value: '叶子节点' },
        { name: 'D', value: '叶子节点' },
        { name: 'D1', value: '叶子节点' },
        { name: 'D2', value: '叶子节点' },
      ],
    },
    {
      name: '信托融资',
      nodeType: 'parent',
      children: [
        { name: 'E', value: '叶子节点' },
        { name: 'F', value: '叶子节点' },
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
const tree = new Tree('.tree', { key: 'name' });
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
// tree.highlightNode('配股');

const plus = document.querySelector('#plus');
const reset = document.querySelector('#reset');
const minus = document.querySelector('#minus');
const search = document.querySelector('#search');
plus.addEventListener('click', () => {
  tree.scale(1.5);
});
reset.addEventListener('click', () => {
  tree.reset();
});
minus.addEventListener('click', () => {
  tree.scale(1 / 1.5);
});
search.addEventListener('change', e => {
  const text = e.target.value.trim();
  if (text) {
    tree.highlightNode(text);
  } else {
    tree.resetHighlight();
  }
});
