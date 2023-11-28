import { onBeforeUnmount, onMounted, ref } from 'vue';

/** 列宽拖动 */
export function useColResize({ tableContainer, tableHeaderLast, colResizeIndicator, props, emit, colKeyGen }) {
  /** 列宽是否在拖动 */
  const isColResizing = ref(false);
  /** 列宽调整状态 */
  let colResizeState = {
    /** 当前被拖动的列 @type {import('@/StkTable').StkTableColumn<any> | null}*/
    currentCol: null,
    /** 当前被拖动列的下标 */
    currentColIndex: 0,
    /** 鼠标按下开始位置 */
    startX: 0,
    /** 鼠标按下时鼠标对于表格的偏移量 */
    startOffsetTableX: 0,
  };
  onMounted(() => {
    initColResizeEvent();
  });

  onBeforeUnmount(() => {
    clearColResizeEvent();
  });
  /** 初始化列宽拖动事件 */
  function initColResizeEvent() {
    window.addEventListener('mousemove', onThResizeMouseMove);
    window.addEventListener('mouseup', onThResizeMouseUp);
  }

  /** 清除列宽拖动事件 */
  function clearColResizeEvent() {
    window.removeEventListener('mousemove', onThResizeMouseMove);
    window.removeEventListener('mouseup', onThResizeMouseUp);
  }

  /**
   * 拖动开始
   * @param {MouseEvent} e
   * @param {import('@/StkTable').StkTableColumn<any>} col 当前列配置
   * @param {boolean} isPrev 是否要上一列
   */
  function onThResizeMouseDown(e, col, isPrev) {
    e.stopPropagation();
    e.preventDefault();
    const { clientX } = e;
    const { scrollLeft } = tableContainer.value;
    const { left } = tableContainer.value.getBoundingClientRect();
    /** 列下标 */
    let colIndex = tableHeaderLast.value.findIndex(it => colKeyGen(it) === colKeyGen(col));
    if (isPrev) {
      // 上一列
      colIndex -= 1;
      col = tableHeaderLast.value[colIndex];
    }
    const offsetTableX = clientX - left + scrollLeft;

    // 记录拖动状态
    isColResizing.value = true;
    Object.assign(colResizeState, {
      currentCol: col,
      currentColIndex: colIndex,
      startX: clientX,
      startOffsetTableX: offsetTableX,
    });

    // 展示指示线，更新其位置
    colResizeIndicator.value.style.display = 'block';
    colResizeIndicator.value.style.left = offsetTableX + 'px';
    colResizeIndicator.value.style.top = tableContainer.value.scrollTop + 'px';
  }

  /**
   * @param {MouseEvent} e
   */
  function onThResizeMouseMove(e) {
    if (!isColResizing.value) return;
    e.stopPropagation();
    e.preventDefault();
    const { currentCol, startX, startOffsetTableX } = colResizeState;
    const { clientX } = e;
    let moveX = clientX - startX;
    // 移动量不小于最小列宽
    if (parseInt(currentCol.width) + moveX < props.colMinWidth) moveX = -parseInt(currentCol.width);

    const offsetTableX = startOffsetTableX + moveX;
    colResizeIndicator.value.style.left = offsetTableX + 'px';
  }

  /**
   * @param {MouseEvent} e
   */
  function onThResizeMouseUp(e) {
    if (!isColResizing.value) return;
    const { startX, currentCol } = colResizeState;
    const { clientX } = e;
    const moveX = clientX - startX;

    // 移动量不小于最小列宽
    let width = parseInt(currentCol.width) + moveX;
    if (width < props.colMinWidth) width = props.colMinWidth;

    const curCol = tableHeaderLast.value.find(it => colKeyGen(it) === colKeyGen(currentCol));
    curCol.width = width + 'px';

    emit('update:columns', [...props.columns]);

    // 隐藏指示线
    colResizeIndicator.value.style.display = 'none';
    // 清除拖动状态
    isColResizing.value = false;
    colResizeState = {
      currentCol: null,
      currentColIndex: 0,
      startX: 0,
      startOffsetTableX: 0,
    };
  }

  return {
    isColResizing,
    onThResizeMouseDown,
    onThResizeMouseMove,
    onThResizeMouseUp,
  };
}
