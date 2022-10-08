<template>
  <div
    ref="tableContainer"
    class="stk-table-wrapper dark"
    :class="{ virtual: virtual }"
    :style="virtual && { '--row-height': virtualScroll.rowHeight + 'px' }"
    @scroll="onTableScroll"
  >
    <!-- 横向滚动时固定列的阴影，TODO: 覆盖一层在整个表上，使用linear-gradient 绘制阴影-->
    <!-- <div
      :class="showFixedLeftShadow && 'stk-table-fixed-left-col-box-shadow'"
      :style="{ width: fixedLeftColWidth + 'px' }"
    ></div> -->
    <!-- 这个元素用于虚拟滚动时，撑开父容器的高度 （已弃用，因为滚动条拖动过快，下方tr为加载出来时，会导致表头sticky闪动）
      <div
        v-if="virtual"
        class="virtual-table-height"
        :style="{ height: dataSourceCopy.length * virtualScroll.rowHeight + 'px' }"
      ></div>
    -->
    <!-- 表格主体 -->
    <table class="stk-table-main" :style="{ minWidth: minWidth }">
      <!-- <colgroup>
          <col v-for="(col, i) in tableProps" :key="i" :style="{}" />
        </colgroup> -->
      <thead>
        <tr v-for="(row, index) in tableHeaders" :key="index" @contextmenu="e => onHeaderMenu(e)">
          <th
            v-for="col in row"
            :key="col.dataIndex"
            draggable="true"
            :rowspan="col.rowSpan"
            :colspan="col.colSpan"
            :style="{
              textAlign: col.headerAlign,
              width: col.width,
              minWidth: col.fixed ? col.width : col.minWidth,
              maxWidth: col.fixed ? col.width : col.maxWidth,
              ...fixedStyle('th', col),
            }"
            :title="col.title"
            :class="[
              col.sorter ? 'sortable' : '',
              col.dataIndex === sortCol && sortOrderIndex !== 0 && 'sorter-' + sortSwitchOrder[sortOrderIndex],
              showHeaderOverflow ? 'text-overflow' : '',
              col.headerClassName,
            ]"
            @click="
              e => {
                onColumnSort(col);
                onHeaderCellClick(e, col);
              }
            "
            @dragstart="onThDragStart"
            @drop="onThDrop"
            @dragover="onThDragOver"
          >
            <div class="table-header-cell-wrapper">
              <component :is="col.customHeaderCell(col)" v-if="col.customHeaderCell" />
              <template v-else>
                <slot name="table-header" :column="col">
                  <span class="table-header-title">{{ col.title }}</span>
                </slot>
              </template>

              <!-- 排序图图标 -->
              <span v-if="col.sorter" class="table-header-sorter">
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16">
                  <g id="sort-btn" fill-rule="nonzero">
                    <polygon
                      id="arrow-up"
                      fill="#757699"
                      points="7.99693049 2.00077299 4.79705419 6.00077299 11.1722317 6.00077299"
                    ></polygon>
                    <polygon
                      id="arrow-down"
                      fill="#757699"
                      transform="translate(7.984643, 11.999227) scale(-1, 1) rotate(-180.000000) translate(-7.984643, -11.999227) "
                      points="7.99693049 9.999227 4.79705419 13.999227 11.1722317 13.999227"
                    ></polygon>
                  </g>
                </svg>
              </span>
            </div>
          </th>
        </tr>
      </thead>

      <!-- <tbody :style="{transform: `translateY(${virtualScroll.offsetTop}px)`}"> -->
      <tbody>
        <template v-if="virtual">
          <!-- 用于虚拟滚动表格内容定位 -->
          <tr :style="{ height: virtualScroll.offsetTop + 'px' }"></tr>
        </template>
        <template v-if="dataSourceCopy && dataSourceCopy.length">
          <tr
            v-for="(item, i) in virtual ? virtual_dataSourcePart : dataSourceCopy"
            :key="rowKey ? rowKeyGen(item) : i"
            :data-row-key="rowKey ? rowKeyGen(item) : i"
            :class="{
              active: rowKey
                ? rowKeyGen(item) === (currentItem.value && rowKeyGen(currentItem.value))
                : item === currentItem.value,
              hover: rowKey ? rowKeyGen(item) === currentHover.value : item === currentHover.value,
            }"
            @click="e => onRowClick(e, item)"
            @dblclick="e => onRowDblclick(e, item)"
            @contextmenu="e => onRowMenu(e, item)"
            @mouseover="e => onTrMouseOver(e, item)"
          >
            <td
              v-for="col in tableProps"
              :key="col.dataIndex"
              :data-index="col.dataIndex"
              :class="[col.className, showOverflow ? 'text-overflow' : '']"
              :style="{
                textAlign: col.align,
                minWidth: col.fixed ? col.width : col.minWidth,
                maxWidth: col.fixed ? col.width : col.maxWidth,
                ...fixedStyle('td', col),
              }"
              :title="item[col.dataIndex]"
              @click="e => onCellClick(e, item, col)"
            >
              <component :is="col.customCell(col, item)" v-if="col.customCell" />
              <div v-else class="table-cell-wrapper">{{ item[col.dataIndex] ?? emptyCellText }}</div>
            </td>
          </tr>
        </template>
        <template v-if="virtual">
          <!-- 用于虚拟滚动表格内容定位 -->
          <tr :style="{ height: virtual_offsetBottom + 'px' }"></tr>
        </template>
      </tbody>
    </table>
    <div
      v-if="(!dataSourceCopy || !dataSourceCopy.length) && showNoData"
      class="stk-table-no-data"
      :class="{ 'no-data-full': noDataFull }"
    >
      <slot name="no-data">暂无数据</slot>
    </div>
  </div>
</template>

<script>
/**
 * @author JA+
 * 存在的问题：column.dataIndex 作为唯一键，不能重复
 */
function _howDeepTheColumn(arr, level = 1) {
  const levels = [level];
  arr.forEach(item => {
    if (item.children?.length) {
      levels.push(_howDeepTheColumn(item.children, level + 1));
    }
  });
  return Math.max(...levels);
}

export default {
  props: {
    minWidth: {
      type: String,
      default: '100%',
    },
    virtual: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    rowKey: {
      type: [String, Function],
      default: '',
    },
    emptyCellText: {
      type: String,
      default: '--',
    },
    /** 暂无数据兜底高度是否撑满 */
    noDataFull: {
      type: Boolean,
      default: false,
    },
    /** 是否展示暂无数据 */
    showNoData: {
      type: Boolean,
      default: true,
    },
    /** 是否服务端排序，true则不排序数据 */
    sortRemote: {
      type: Boolean,
      default: false,
    },
    /** 表头是否溢出展示... */
    showHeaderOverflow: {
      type: Boolean,
      default: false,
    },
    /** 表体溢出是否展示... */
    showOverflow: {
      type: Boolean,
      default: false,
    },
    /** 是否增加行hoverclass */
    showTrHoverClass: {
      type: Boolean,
      defualt: false,
    },
  },
  data() {
    return {
      /** 是否展示横向滚动固定列的阴影 */
      showFixedLeftShadow: false,

      /** 当前选中的一行*/
      currentItem: { value: null },
      /** 当前hover的行 */
      currentHover: { value: null },
      /** 排序的列*/
      sortCol: null,
      sortOrderIndex: 0,
      /** 排序切换顺序 */
      sortSwitchOrder: [null, 'desc', 'asc'],
      tableHeaders: [],
      /** 若有多级表头时，的tableHeaders */
      tableProps: [],
      dataSourceCopy: [],
      /** 高亮后渐暗的单元格 */
      // highlightDimCells: {},
      /** 高亮后渐暗的行定时器 */
      highlightDimRowsTimeout: new Map(),
      virtualScroll: {
        containerHeight: 0,
        startIndex: 0, // 数组开始位置
        rowHeight: 28,
        offsetTop: 0, // 表格定位上边距
        scrollTop: 0,
      },
      thDrag: {
        dragIndex: null,
      },
    };
  },
  computed: {
    /** 虚拟滚动展示的行数 */
    virtual_pageSize() {
      return Math.ceil(this.virtualScroll.containerHeight / this.virtualScroll.rowHeight);
    },
    /** 虚拟滚动展示的行 */
    virtual_dataSourcePart() {
      return this.dataSourceCopy.slice(
        this.virtualScroll.startIndex,
        this.virtualScroll.startIndex + this.virtual_pageSize,
      );
    },
    /** 虚拟表格定位下边距*/
    virtual_offsetBottom() {
      return (
        (this.dataSourceCopy.length - (this.virtualScroll.startIndex || 1) - this.virtual_dataSourcePart.length) *
        this.virtualScroll.rowHeight
      );
    },
    // fixedLeftColWidth() {
    //   let fixedLeftColumns = this.tableProps.filter(it => it.fixed === 'left');
    //   let width = 0;
    //   for (let i = 0; i < fixedLeftColumns.length; i++) {
    //     const col = fixedLeftColumns[i];
    //     width += parseInt(col.width);
    //   }
    //   return width;
    // },
  },
  watch: {
    columns: {
      handler(val) {
        this.dealColumns(val);
      },
      deep: true,
    },
    /** 监听表格数据变化 */
    dataSource(val) {
      // this.dealColumns(val);
      this.dataSourceCopy = [...val];
      if (this.sortCol) {
        // 排序
        const column = this.columns.find(it => it.dataIndex === this.sortCol);
        this.onColumnSort(column, false);
      }
    },
  },
  created() {
    this.dealColumns();
    this.dataSourceCopy = [...this.dataSource];
  },
  mounted() {
    if (this.virtual) this.initVirtualScroll();
  },
  methods: {
    /**
     * 初始化虚拟滚动参数
     * @param {number} containerHeight 虚拟滚动的高度
     */
    initVirtualScroll(containerHeight) {
      this.virtualScroll.containerHeight =
        typeof containerHeight === 'number' ? containerHeight : this.$refs.tableContainer.offsetHeight;
    },
    /** 固定列的style */
    fixedStyle(tagType, col) {
      let cols = [...this.tableProps]; // tbody col
      if (tagType === 'th') {
        cols = [...this.tableHeaders.flat()]; // thead col
      }
      const style = {};
      if (['left', 'right'].includes(col.fixed)) {
        if (col.fixed === 'right') cols.reverse(); // 右边固定列要反转
        let position = 0; // left | right 的距离
        const fixedCols = [];
        for (let i = 0; i < cols.length; i++) {
          const item = cols[i];
          if (item.fixed === col.fixed) fixedCols.push(item);
          if (item.dataIndex === col.dataIndex) break; // 遇到本列就结束循环，不再添加
        }
        // const unit = fixedRows[0].width.replace(/\d+/, '');
        // -1: 不计算本列的宽度
        for (let i = 0; i < fixedCols.length - 1; i++) {
          position += parseInt(fixedCols[i].width);
        }
        style.position = 'sticky';
        if (col.fixed === 'left') {
          style.left = position + 'px';
        } else {
          style.right = position + 'px';
        }
        if (tagType === 'th') {
          style.zIndex = 2; // 保证固定列高于其他单元格
        }
      }

      return style;
    },
    /** 处理多级表头 */
    dealColumns() {
      // reset
      this.tableHeaders = [];
      this.tableProps = [];
      const copyColumn = this.columns;
      const deep = _howDeepTheColumn(copyColumn);
      const tmpHeader = [];
      const tmpProps = [];
      // 展开columns
      (function flat(arr, level = 0) {
        const colArr = [];
        const childrenArr = [];
        arr.forEach(col => {
          col.rowSpan = col.children ? false : deep - level;
          col.colSpan = col.children?.length;
          if (col.rowSpan === 1) delete col.rowSpan;
          if (col.colSpan === 1) delete col.colSpan;
          colArr.push(col);
          if (col.children) {
            childrenArr.push(...col.children);
          } else {
            tmpProps.push(col); // 没有children的列作为colgroup
          }
        });
        tmpHeader.push(colArr);
        if (childrenArr.length) flat(childrenArr, level + 1);
      })(copyColumn);
      this.tableHeaders = tmpHeader;
      this.tableProps = tmpProps;
    },
    /** 行唯一值生成 */
    rowKeyGen(row) {
      if (typeof this.rowKey === 'function') {
        return this.rowKey(row);
      } else {
        return row[this.rowKey];
      }
    },
    // ------event handler-------------
    /** 表头点击排序 */
    onColumnSort(col, click = true) {
      if (!col.sorter) return;
      if (this.sortCol !== col.dataIndex) {
        // 改变排序的列时，重置排序
        this.sortCol = col.dataIndex;
        this.sortOrderIndex = 0;
      }
      if (click) {
        this.sortOrderIndex++;
      }
      if (this.sortOrderIndex > 2) this.sortOrderIndex = 0;
      const order = this.sortSwitchOrder[this.sortOrderIndex];

      if (!this.sortRemote) {
        if (typeof col.sorter === 'function') {
          const customSorterData = col.sorter([...this.dataSource], { order, column: col });
          if (customSorterData) this.dataSourceCopy = customSorterData;
          else this.dataSourceCopy = [...this.dataSource]; // 还原数组
        } else if (order) {
          let sortField = col.dataIndex;
          if (col.sortBy) sortField = col.sortBy;
          if (col.sortType === 'number') {
            // 按数字类型排序
            const nanArr = []; // 非数字
            const numArr = []; // 数字
            // 非数字不进入排序，一直排在最后
            for (let i = 0; i < this.dataSourceCopy.length; i++) {
              const row = this.dataSourceCopy[i];
              if (
                row[sortField] === null ||
                row[sortField] === '' ||
                typeof row[sortField] === 'boolean' ||
                Number.isNaN(+row[sortField])
              ) {
                nanArr.push(row);
              } else {
                numArr.push(row);
              }
            }
            if (order === 'asc') {
              numArr.sort((a, b) => +a[sortField] - +b[sortField]);
            } else {
              numArr.sort((a, b) => +b[sortField] - +a[sortField]);
            }
            this.dataSourceCopy = [...numArr, ...nanArr];
          } else {
            // 按string 排序
            if (order === 'asc') {
              this.dataSourceCopy.sort((a, b) => String(a[sortField]).localeCompare(b[sortField]));
            } else {
              this.dataSourceCopy.sort((a, b) => String(a[sortField]).localeCompare(b[sortField]) * -1);
            }
          }
        } else {
          this.dataSourceCopy = [...this.dataSource];
        }
      }
      // 只有点击才触发事件
      if (click) {
        this.$emit('sort-change', col, order);
      }
    },
    /** 插入一行 
    insertData(data) {
      // TODO: 根据排序情况插入数据
      if(!this.sortCol) return;
      const col = this.columns.find(it => it.dataIndex === this.sortCol);
      const sorter = col.sorter;
    },*/
    onRowClick(e, row) {
      this.$emit('row-click', e, row);
      // 选中同一行不触发current-change 事件
      if (this.currentItem.value === row) return;
      this.currentItem.value = row;
      this.$emit('current-change', e, row);
    },
    onRowDblclick(e, row) {
      this.$emit('row-dblclick', e, row);
    },
    /** 表头行右键 */
    onHeaderMenu(e) {
      this.$emit('header-row-menu', e);
    },
    /** 表体行右键 */
    onRowMenu(e, row) {
      this.$emit('row-menu', e, row);
    },
    /** 单元格单击 */
    onCellClick(e, row, col) {
      this.$emit('cell-click', e, row, col);
    },
    /** 表头单元格单击 */
    onHeaderCellClick(e, col) {
      this.$emit('header-cell-click', e, col);
    },
    /** 滚动条监听 */
    onTableScroll(e) {
      if (!e?.target) return;
      if (this.virtual) {
        const top = e.target.scrollTop;
        const { rowHeight } = this.virtualScroll;
        this.virtualScroll.startIndex = parseInt(top / rowHeight);
        // 这里由于边界情况 - 1，用于保证表格总高度不要高出实际行*行高, || 1 用来保证 startIndex - 1 不为负数
        // if(this.virtualScroll.startIndex > this.dataSourceCopy.length - this.virtual_pageSize)
        this.virtualScroll.offsetTop = ((this.virtualScroll.startIndex || 1) - 1) * rowHeight;
        // this.virtualScroll.scrollTop = top;
      }
      // const res = {
      //   isTop: e.target.scrollTop <= 0,
      //   isBottom: e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight,
      // };
      // this.$emit('scroll', e); // vue3 不需要暴露，因为事件在根元素上
      // this.showFixedLeftShadow = e.target.scrollLeft > 0;
    },
    /** tr hover事件 */
    onTrMouseOver(e, item) {
      if (this.showTrHoverClass) {
        this.currentHover.value = this.rowKeyGen(item);
      }
    },
    /** th拖动释放时 */
    onThDrop(e) {
      let th = e.target;
      // 找到th元素
      while (th) {
        if (th.tagName === 'TH') break;
        th = th.parentNode;
      }
      const i = Array.prototype.indexOf.call(th.parentNode.children, th); // 得到是第几个子元素
      if (this.thDrag.dragIndex !== i) {
        this.$emit('col-order-change', this.thDrag.dragIndex, i);
      }
      this.$emit('th-drop', i);
    },
    /** 开始拖动记录th位置 */
    onThDragStart(e) {
      const i = Array.prototype.indexOf.call(e.target.parentNode.children, e.target); // 得到是第几个子元素
      this.thDrag.dragIndex = i;
      this.$emit('th-drag-start', i);
    },
    onThDragOver(e) {
      e.preventDefault();
    },

    // ---- ref function-----
    /**
     * 选中一行，
     * @param {string} rowKey
     * @param {boolean} option.silent 是否触发回调
     */
    setCurrentRow(rowKey, option = { silent: false }) {
      if (!this.dataSourceCopy.length) return;
      this.currentItem.value = this.dataSourceCopy.find(it => this.rowKeyGen(it) === rowKey);
      if (!option.silent) {
        this.$emit('current-change', this.currentItem);
      }
    },
    /** 高亮一个单元格 */
    setHighlightDimCell(rowKeyValue, dataIndex) {
      const cellEl = this.$el.querySelector(`[data-row-key="${rowKeyValue}"]>[data-index="${dataIndex}"]`);
      if (!cellEl) return;
      cellEl.classList.remove('highlight-cell');
      void cellEl.offsetHeight;
      cellEl.classList.add('highlight-cell');
    },
    /** 高亮一行 */
    setHighlightDimRow(rowKeyValue) {
      const rowEl = this.$el.querySelector(`[data-row-key="${rowKeyValue}"]`);
      if (!rowEl) return;
      rowEl.classList.remove('highlight-row');
      void rowEl.offsetWidth;
      rowEl.classList.add('highlight-row');
      // 动画结束移除class
      window.clearTimeout(this.highlightDimRowsTimeout.get(rowKeyValue));
      this.highlightDimRowsTimeout.set(
        rowKeyValue,
        window.setTimeout(() => {
          rowEl.classList.remove('highlight-row');
          this.highlightDimRowsTimeout.delete(rowKeyValue); // 回收内存
        }, 2000),
      );
    },
    /**
     * 设置排序
     * @param {string} dataIndex
     * @param {'asc'|'desc'|null} order
     */
    setSorter(dataIndex, order) {
      this.sortCol = dataIndex;
      this.sortOrderIndex = this.sortSwitchOrder.findIndex(it => it == order);
      if (this.dataSourceCopy?.length) {
        // 如果表格有数据，则进行排序
        const column = this.columns.find(it => it.dataIndex === this.sortCol);
        this.onColumnSort(column, false);
      }
    },
    /** 重置排序 */
    resetSorter() {
      this.sortCol = null;
      this.sortOrderIndex = 0;
      this.dataSourceCopy = [...this.dataSource];
    },
    /** 滚动 */
    scrollTo(top = 0) {
      this.$refs.tableContainer.scrollTop = top;
    },
  },
};
</script>

<style lang="less" scoped>
.stk-table-wrapper {
  --row-height: 28px;
  --border-color: #e8eaec;
  // --border: 1px #ececf7 solid;
  --td-bg-color: #fff;
  --th-bg-color: #f8f8f9;
  --tr-active-bg-color: rgb(230, 247, 255);
  --tr-hover-bg-color: rgba(230, 247, 255, 0.7);
  --bg-border-top: linear-gradient(180deg, var(--border-color) 1px, transparent 1px);
  --bg-border-right: linear-gradient(270deg, var(--border-color) 1px, transparent 1px);
  --bg-border-bottom: linear-gradient(0deg, var(--border-color) 1px, transparent 1px);
  --bg-border-left: linear-gradient(90deg, var(--border-color) 1px, transparent 1px);
  --highlight-color: rgba(113, 162, 253, 1);

  --sort-arrow-color: #5d5f69;
  --sort-arrow-hover-color: #8f90b5;
  --sort-arrow-active-color: #1b63d9;
  --sort-arrow-active-sub-color: #cbcbe1;
  // --highlight-color-to: rgba(113, 162, 253, 0);
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
  // .stk-table-fixed-left-col-box-shadow {
  //   position: sticky;
  //   left: 0;
  //   top: 0;
  //   height: 100%;
  //   box-shadow: 0 0 10px;
  //   z-index: 1;
  //   pointer-events: none;
  // }
  .stk-table-main {
    // position: absolute;
    // top: 0;
    border-spacing: 0;
    table-layout: fixed;
    th,
    td {
      z-index: 1;
      height: var(--row-height);
      font-size: 14px;
      box-sizing: border-box;
      padding: 2px 5px;
      padding: 0 8px;
      background-image: var(--bg-border-right), var(--bg-border-bottom);
    }
    thead {
      tr {
        &:first-child th {
          position: sticky;
          top: 0;
          // border-top: 1px solid var(--border-color);
          background-image: var(--bg-border-top), var(--bg-border-right), var(--bg-border-bottom);
          &:first-child {
            background-image: var(--bg-border-top), var(--bg-border-right), var(--bg-border-bottom),
              var(--bg-border-left);
          }
        }
        th {
          background-color: var(--th-bg-color);
          &.sortable {
            cursor: pointer;
          }
          &:first-child {
            // border-left: 1px solid var(--border-color);
            background-image: var(--bg-border-top), var(--bg-border-right), var(--bg-border-bottom),
              var(--bg-border-left);
            // padding-left: 12px;
          }
          // &:last-child {
          //   padding-right: 12px;
          // }
          &.text-overflow {
            .table-header-cell-wrapper {
              white-space: nowrap;
              overflow: hidden;
              .table-header-title {
                text-overflow: ellipsis;
                overflow: hidden;
              }
            }
          }
          &:not(.sorter-desc):not(.sorter-asc):hover .table-header-cell-wrapper .table-header-sorter {
            #arrow-up {
              fill: var(--sort-arrow-hover-color);
            }
            #arrow-down {
              fill: var(--sort-arrow-hover-color);
            }
          }
          &.sorter-desc .table-header-cell-wrapper .table-header-sorter {
            #arrow-up {
              fill: var(--sort-arrow-active-sub-color);
            }
            #arrow-down {
              fill: var(--sort-arrow-active-color);
            }
          }
          &.sorter-asc .table-header-cell-wrapper .table-header-sorter {
            #arrow-up {
              fill: var(--sort-arrow-active-color);
            }
            #arrow-down {
              fill: var(--sort-arrow-active-sub-color);
            }
          }

          .table-header-cell-wrapper {
            max-width: 100%; //最大宽度不超过列宽
            display: inline-flex;
            align-items: center;

            .table-header-title {
              overflow: hidden;
              align-self: flex-start;
            }
            .table-header-sorter {
              flex-shrink: 0;
              margin-left: 4px;
              width: 16px;
              height: 16px;
              #arrow-up,
              #arrow-down {
                fill: var(--sort-arrow-color);
              }
            }
          }
        }
      }
    }
    tbody {
      /**高亮渐暗 */
      @keyframes dim {
        from {
          background-color: var(--highlight-color);
        }
      }
      tr {
        &.highlight-row td:not(.highlight-cell) {
          animation: dim 2s linear;
        }
        &.active {
          td {
            background-color: var(--tr-active-bg-color);
          }
        }
        &.hover,
        &:hover {
          td {
            background-color: var(--tr-hover-bg-color);
          }
        }
        td {
          background-color: var(--td-bg-color);
          &:first-child {
            // border-left: 1px solid var(--border-color);
            background-image: var(--bg-border-right), var(--bg-border-bottom), var(--bg-border-left);
            // padding-left: 12px;
          }
          // &:last-child {
          //   padding-right: 12px;
          // }

          &.highlight-cell {
            animation: dim 2s linear;
          }
          &.text-overflow {
            .table-cell-wrapper {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
      // 斑马纹
      // tr:nth-child(2n) td {
      //   background-color: #fafafc;
      // }
      // tr:hover {
      //   background-color: #ebf3ff;
      // }
    }
  }
  .stk-table-no-data {
    line-height: var(--row-height);
    text-align: center;
    font-size: 14px;
    position: sticky;
    width: 100%;
    left: 0px;
    background: var(--bg-border-left), var(--bg-border-bottom), var(--bg-border-right);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &.no-data-full {
      flex: 1;
    }
  }

  /**深色模式 */
  &.dark {
    // --th-bg-color: #26272c;
    --th-bg-color: #181c21;
    --td-bg-color: #181c21;
    --border-color: #2e2e33;
    --tr-active-bg-color: #283f63;
    --tr-hover-bg-color: #1a2b46;
    --highlight-color: rgba(34, 103, 218, 0.65);
    // --highlight-color-to: rgba(19, 55, 125, 0);
    --sort-arrow-color: #5d6064;
    --sort-arrow-hover-color: #727782;
    --sort-arrow-active-color: #d0d1d2;
    --sort-arrow-active-sub-color: #5d6064;

    background-color: var(--th-bg-color);
    color: #d0d1d2;
    // .stk-table-main {
    // }
  }
  /**虚拟滚动模式 */
  &.virtual {
    .virtual-table-height {
      width: 1px;
      z-index: -2;
      position: absolute;
    }
    .stk-table-main {
      thead {
        tr {
          th {
            // 为不影响布局，表头行高要定死
            .table-header-cell-wrapper {
              overflow: hidden;
              max-height: var(--row-height);
            }
          }
        }
      }
      tbody {
        position: relative;
        tr {
          td {
            .table-cell-wrapper {
              overflow: hidden;
              height: var(--row-height);
              line-height: var(--row-height);
            }
          }
        }
      }
    }
  }
}
</style>
