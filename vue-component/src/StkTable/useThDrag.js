export function useThDrag({ emit }) {
  const thDrag = {
    dragStartKey: null,
  };
  /** 开始拖动记录th位置 */
  function onThDragStart(e) {
    // const i = Array.prototype.indexOf.call(e.target.parentNode.children, e.target); // 得到是第几个子元素
    thDrag.dragStartKey = e.target.dataset.colKey;
    emit('th-drag-start', thDrag.dragStartKey);
  }
  function onThDragOver(e) {
    e.preventDefault();
  }
  /** th拖动释放时 */
  function onThDrop(e) {
    let th = e.target;
    // 找到th元素
    while (th) {
      if (th.tagName === 'TH') break;
      th = th.parentNode;
    }
    // const i = Array.prototype.indexOf.call(th.parentNode.children, th); // 得到是第几个子元素
    if (thDrag.dragStartKey !== th.dataset.colKey) {
      emit('col-order-change', thDrag.dragStartKey, th.dataset.colKey);
    }
    emit('th-drop', th.dataset.colKey);
  }
  return {
    onThDragStart,
    onThDragOver,
    onThDrop,
  };
}
