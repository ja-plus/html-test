import { Ref, onBeforeUnmount, onMounted, ref } from 'vue';
import { Default_Col_Width } from './const';
import { StkTableColumn } from './types';

type ColResizeState = {
  /** 当前被拖动的列*/
  currentCol: StkTableColumn<any> | null;
  /** 当前被拖动列的下标 */
  currentColIndex: number;
  /** 鼠标按下开始位置 */
  startX: number;
  /** 鼠标按下时鼠标对于表格的偏移量 */
  startOffsetTableX: 0;
};

type Params = {
  props: any;
  emit: any;
  tableContainer: Ref<HTMLElement | undefined>;
  tableHeaderLast: Ref<StkTableColumn<any>[]>;
  colResizeIndicator: Ref<HTMLElement | undefined>;
  colKeyGen: (p: any) => string;
};

/** 列宽拖动 */
export function useColResize({ tableContainer, tableHeaderLast, colResizeIndicator, props, emit, colKeyGen }: Params) {
  /** 列宽是否在拖动 */
  const isColResizing = ref(false);

  /** 列宽调整状态 */
  let colResizeState: ColResizeState = {
    currentCol: null,
    currentColIndex: 0,
    startX: 0,
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
   * @param e
   * @param col 当前列配置
   * @param isPrev 是否要上一列
   */
  function onThResizeMouseDown(e: MouseEvent, col: StkTableColumn<any>, isPrev = false) {
    if (!tableContainer.value) return;
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
    if (colResizeIndicator.value) {
      colResizeIndicator.value.style.display = 'block';
      colResizeIndicator.value.style.left = offsetTableX + 'px';
      colResizeIndicator.value.style.top = tableContainer.value.scrollTop + 'px';
    }
  }

  /**
   * @param {MouseEvent} e
   */
  function onThResizeMouseMove(e: MouseEvent) {
    if (!isColResizing.value) return;
    e.stopPropagation();
    e.preventDefault();
    const { currentCol, startX, startOffsetTableX } = colResizeState;
    const { clientX } = e;
    let moveX = clientX - startX;
    const currentColWidth = parseInt(currentCol?.width || Default_Col_Width);
    // 移动量不小于最小列宽
    if (currentColWidth + moveX < props.colMinWidth) {
      moveX = -currentColWidth;
    }

    const offsetTableX = startOffsetTableX + moveX;
    if (!colResizeIndicator.value) return;
    colResizeIndicator.value.style.left = offsetTableX + 'px';
  }

  /**
   * @param {MouseEvent} e
   */
  function onThResizeMouseUp(e: MouseEvent) {
    if (!isColResizing.value) return;
    const { startX, currentCol } = colResizeState;
    const { clientX } = e;
    const moveX = clientX - startX;

    // 移动量不小于最小列宽
    let width = parseInt(currentCol?.width || Default_Col_Width) + moveX;
    if (width < props.colMinWidth) width = props.colMinWidth;

    const curCol = tableHeaderLast.value.find(it => colKeyGen(it) === colKeyGen(currentCol));
    if (!curCol) return;
    curCol.width = width + 'px';

    emit('update:columns', [...props.columns]);

    // 隐藏指示线
    if (colResizeIndicator.value) {
      colResizeIndicator.value.style.display = 'none';
      colResizeIndicator.value.style.left = '0';
      colResizeIndicator.value.style.top = '0';
    }
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
