const listHeight = 600;
const itemHeight = 30; // 每个列表项的高度
const list = Array.from({ length: 1000 }).map((it, id) => ({ id: id + 'id', name: 'name' + id, age: 'age' + id }));
const listSize = list.length;
const virtualList = document.getElementById('virtualList');
const listHeader = document.getElementById('header');
const listContent = document.getElementById('content');

const cols = [
  { title: 'title', dataIndex: 'id', width: 40 },
  { title: 'Name', dataIndex: 'name', width: 100 },
  { title: 'Age', dataIndex: 'age', width: 100 },
  { title: 'Gender', dataIndex: 'gender', width: 150 },
  { title: 'Email(sortBy:name)', dataIndex: 'email', width: 150 },
  { title: 'Address', dataIndex: 'address', width: '100' },
  { title: 'Address', dataIndex: 'address1', width: '100' },
  { title: 'Address', dataIndex: 'address2', width: '100' },
  { title: 'Address', dataIndex: 'address3', width: '100' },
  {
    dataIndex: 'R',
    title: 'R',
    width: '50',
  },
  {
    title: 'Operate',
    dataIndex: 'Operate',
    width: '150',
  },
  ...new Array(10).fill(0).map((it, i) => {
    return {
      title: 'other' + i,
      dataIndex: 'other' + i,
    };
  }),
];

const virtualY = {
  pageStart: -1,
  pageEnd: 10,
  pageSize: 10,
};
window.addEventListener('DOMContentLoaded', init);

function init() {
  const pageSize = Math.ceil(listHeight / itemHeight);
  virtualY.pageSize = pageSize;
  const headerHtml =
    `<div class="tr">` + cols.map(col => `<div class="th" style="width:${col.width || 100}px;">${col.title}</div>`).join('') + '</div>';
  listHeader.innerHTML = headerHtml;
  updateVirtualY();
}

function render(items) {
  const topHeight = virtualY.pageStart * itemHeight;
  const bottomHeight = (listSize - virtualY.pageEnd) * itemHeight;
  const cellsHtml = items
    .map(item => {
      const cells = cols.map(col => {
        return `<div class="td" style="width:${col.width || 100}px;">${item[col.dataIndex] ?? '--'}</div>`;
      });
      return `<div class="tr">${cells.join('')}</div>`;
    })
    .join(' ');

  const contentHtml = `<div style="height:${topHeight}px"></div>${cellsHtml}<div style="height:${bottomHeight}px"></div>`;

  listContent.innerHTML = contentHtml;
}

virtualList.addEventListener('scroll', e => {
  updateVirtualY(e.target.scrollTop);
});

let rAF = 0;
function updateVirtualY(sTop = 0) {
  if (rAF) {
    window.cancelAnimationFrame(rAF);
  }
  rAF = window.requestAnimationFrame(() => {
    const scrollTop = sTop;
    const pageStart = Math.floor(scrollTop / itemHeight);
    const pageEnd = Math.min(pageStart + virtualY.pageSize + 1, listSize);
    if (virtualY.pageStart !== pageStart || virtualY.pageEnd !== pageEnd) {
      virtualY.pageStart = pageStart;
      virtualY.pageEnd = pageEnd;
      const visibleItems = list.slice(virtualY.pageStart, virtualY.pageEnd + 1);
      render(visibleItems);
    }
    rAF = 0;
  });
}
