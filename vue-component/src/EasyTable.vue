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
    <table
      class="stk-table-main"
      :style="{
        minWidth: minWidth,
      }"
    >
      <!-- transform: virtualX_on ? `translateX(${virtualScrollX.offsetLeft}px)` : null, 用transform控制虚拟滚动左边距，sticky会有问题 -->
      <thead>
        <tr v-for="(row, index) in tableHeaders" :key="index" @contextmenu="e => onHeaderMenu(e)">
          <!-- 这个th用于横向虚拟滚动表格左边距 -->
          <th v-if="virtualX_on" :style="{ minWidth: virtualScrollX.offsetLeft + 'px', padding: 0 }"></th>
          <th
            v-for="col in virtualX_on ? virtualX_columnPart : row"
            :key="col.dataIndex"
            :data-col-key="col.dataIndex"
            draggable="true"
            :rowspan="col.rowSpan"
            :colspan="col.colSpan"
            :style="{
              textAlign: col.headerAlign,
              width: col.width,
              minWidth: col.minWidth || col.width,
              maxWidth: col.maxWidth || col.width,
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
          <!-- 这个th用于横向虚拟滚动表格右边距 -->
          <th v-if="virtualX_on" style="padding: 0" :style="{ minWidth: virtualX_offsetRight + 'px' }"></th>
        </tr>
      </thead>

      <!-- 用于虚拟滚动表格内容定位 -->
      <tbody v-if="virtual_on" :style="{ height: `${virtualScroll.offsetTop}px` }"></tbody>
      <!-- <td
          v-for="col in virtualX_on ? virtualX_columnPart : tableProps"
          :key="col.dataIndex"
          class="perch-td top"
        ></td> -->
      <!-- <tbody :style="{ transform: `translateY(${virtualScroll.offsetTop}px)` }"> -->
      <tbody>
        <template v-if="dataSourceCopy && dataSourceCopy.length">
          <tr
            v-for="(item, i) in virtual_dataSourcePart"
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
            <!--这个td用于配合虚拟滚动的th对应，防止列错位-->
            <td v-if="virtualX_on" style="padding: 0"></td>
            <td
              v-for="col in virtualX_on ? virtualX_columnPart : tableProps"
              :key="col.dataIndex"
              :data-index="col.dataIndex"
              :class="[col.className, showOverflow ? 'text-overflow' : '']"
              :style="{
                textAlign: col.align,
                minWidth: col.minWidth || col.width,
                maxWidth: col.maxWidth || col.width,
                backgroundColor: `rgba(34, 103, 218, ${item._highlight_opacity})`,
                ...fixedStyle('td', col),
              }"
              @click="e => onCellClick(e, item, col)"
            >
              <component :is="col.customCell(col, item)" v-if="col.customCell" />
              <div v-else class="table-cell-wrapper" :title="item[col.dataIndex]">
                {{ item[col.dataIndex] ?? emptyCellText }}
              </div>
            </td>
          </tr>
        </template>
      </tbody>
      <tbody v-if="virtual_on" :style="{ height: `${virtual_offsetBottom}px` }"></tbody>
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
/**
 * 表格排序抽离
 * @param {object} sortOption 列配置
 * @param {any} dataSource 排序的数组
 * @param {string|null} order 排序方式
 */
export function tableSort(sortOption, dataSource, order) {
  let targetDataSource = [...dataSource];
  if (typeof sortOption.sorter === 'function') {
    const customSorterData = sortOption.sorter(targetDataSource, { order, column: sortOption });
    if (customSorterData) targetDataSource = customSorterData;
  } else if (order) {
    let sortField = sortOption.dataIndex;
    if (sortOption.sortField) sortField = sortOption.sortField;
    if (sortOption.sortType === 'number') {
      // 按数字类型排序
      const nanArr = []; // 非数字
      const numArr = []; // 数字

      for (let i = 0; i < targetDataSource.length; i++) {
        const row = targetDataSource[i];
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
      // 非数字当作最小值处理
      if (order === 'asc') {
        numArr.sort((a, b) => +a[sortField] - +b[sortField]);
        targetDataSource = [...nanArr, ...numArr];
      } else {
        numArr.sort((a, b) => +b[sortField] - +a[sortField]);
        targetDataSource = [...numArr, ...nanArr];
      }
      // targetDataSource = [...numArr, ...nanArr]; // 非数字不进入排序，一直排在最后
    } else {
      // 按string 排序
      if (order === 'asc') {
        targetDataSource.sort((a, b) => String(a[sortField]).localeCompare(b[sortField]));
      } else {
        targetDataSource.sort((a, b) => String(a[sortField]).localeCompare(b[sortField]) * -1);
      }
    }
  }
  return targetDataSource;
}
export default {
  name: 'StkTable',
  props: {
    minWidth: {
      type: String,
      default: 'min-content',
    },
    /** 虚拟滚动 */
    virtual: {
      type: Boolean,
      default: false,
    },
    /** x轴虚拟滚动 */
    virtualX: {
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
    /** 是否增加行hover class */
    showTrHoverClass: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'row-click',
    'sort-change',
    'current-change',
    'row-dblclick',
    'header-row-menu',
    'row-menu',
    'cell-click',
    'header-cell-click',
    'col-order-change',
    'th-drop',
    'th-drag-start',
    'scroll',
  ],
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
      dataSourceCopy: Object.freeze([]),
      /** 高亮后渐暗的单元格 */
      // highlightDimCells: {},
      /** 高亮后渐暗的行定时器 */
      highlightDimRowsTimeout: new Map(),
      virtualScroll: {
        containerHeight: 0,
        startIndex: 0, // 数组开始位置
        rowHeight: 28,
        offsetTop: 0, // 表格定位上边距
        scrollTop: 0, // 纵向滚动条位置，用于判断是横向滚动还是纵向
      },
      highlightDimRows: new Set(), // 存放高亮行的对象
      calcHighlightDimLoop: false, // 是否正在执行循环
      virtualScrollX: {
        containerWidth: 0,
        startIndex: 0,
        endIndex: 0,
        offsetLeft: 0,
        scrollLeft: 0, // 横向滚动位置，用于判断是横向滚动还是纵向
      },
      thDrag: {
        dragStartKey: null,
      },
    };
  },
  computed: {
    /** 数据量大于2页才开始虚拟滚动*/
    virtual_on() {
      return this.virtual && this.dataSourceCopy.length > this.virtual_pageSize * 2;
    },
    /** 虚拟滚动展示的行数 */
    virtual_pageSize() {
      return Math.ceil(this.virtualScroll.containerHeight / this.virtualScroll.rowHeight);
    },
    /** 虚拟滚动展示的行 */
    virtual_dataSourcePart() {
      if (!this.virtual_on) return this.dataSourceCopy;
      return Object.freeze(
        this.dataSourceCopy.slice(this.virtualScroll.startIndex, this.virtualScroll.startIndex + this.virtual_pageSize),
      );
    },
    /** 虚拟表格定位下边距*/
    virtual_offsetBottom() {
      if (!this.virtual_on) return 0; // 小于一页则不用虚拟滚动
      return (
        (this.dataSourceCopy.length - this.virtualScroll.startIndex - this.virtual_dataSourcePart.length) *
        this.virtualScroll.rowHeight
      );
    },
    /* 是否开启横向虚拟滚动 */
    virtualX_on() {
      return (
        this.virtualX &&
        this.columns.reduce((sum, col) => (sum += parseInt(col.minWidth || col.width)), 0) >
          this.virtualScrollX.containerWidth * 1.5
      );
    },
    /** 横向虚拟滚动展示的列 */
    virtualX_columnPart() {
      if (this.virtualX_on) {
        const fixedLeftColumns = [];
        // 左侧固定列要一直在
        for (let i = 0; i < this.virtualScrollX.startIndex; i++) {
          const col = this.columns[i];
          if (col.fixed === 'left') fixedLeftColumns.push(col);
        }
        return Object.freeze(
          fixedLeftColumns.concat(this.columns.slice(this.virtualScrollX.startIndex, this.virtualScrollX.endIndex)),
        );
      }
      return this.columns;
      // return this.virtualX_on
      //   ? this.columns.slice(this.virtualScrollX.startIndex, this.virtualScrollX.endIndex)
      //   : this.columns;
    },
    /** 横向虚拟滚动，右边距 */
    virtualX_offsetRight() {
      if (!this.virtualX_on) return 0;
      let width = 0;
      for (let i = this.virtualScrollX.endIndex; i < this.columns.length; i++) {
        const col = this.columns[i];
        width += parseInt(col.width || col.maxWidth || col.minWidth);
      }
      return width;
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
        this.initVirtualScrollX();
      },
      // deep: true, // 不能加，因为this.dealColumns 中操作了this.columns
    },
    /** 监听表格数据变化 */
    dataSource(val) {
      // this.dealColumns(val);
      this.dataSourceCopy = [...val];
      // TODO: 数据长度没变则不计算虚拟滚动
      this.initVirtualScrollY();
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
    this.initVirtualScroll();
  },
  methods: {
    /**
     * 初始化虚拟滚动参数
     * @param {number} height 虚拟滚动的高度
     */
    initVirtualScroll(height) {
      this.initVirtualScrollY(height);
      this.initVirtualScrollX();
    },
    initVirtualScrollY(height) {
      if (this.virtual_on) {
        this.virtualScroll.containerHeight =
          typeof height === 'number' ? height : this.$refs.tableContainer?.offsetHeight;
        this.updateVirtualScrollY(this.$refs.tableContainer?.scrollTop);
        // const { offsetTop, containerHeight, rowHeight } = this.virtualScroll;
        // const tableAllHeight = this.dataSourceCopy.length * rowHeight;
        // const overflowHeight = tableAllHeight - containerHeight;
        // if (overflowHeight < offsetTop && overflowHeight > 0) {
        //   this.virtualScroll.offsetTop = overflowHeight;
        //   this.virtualScroll.startIndex = Math.ceil(overflowHeight / rowHeight);
        // } else if (overflowHeight <= 0) {
        //   this.virtualScroll.offsetTop = 0;
        //   this.virtualScroll.startIndex = 0;
        // }
      }
    },
    initVirtualScrollX() {
      if (this.virtualX) {
        this.scrollTo(null, 0);
        this.virtualScrollX.containerWidth = this.$refs.tableContainer?.offsetWidth;
        this.updateVirtualScrollX(this.$refs.tableContainer?.scrollLeft);
      }
    },
    /** 通过滚动条位置，计算虚拟滚动的参数 */
    updateVirtualScrollY(sTop = 0) {
      const { rowHeight } = this.virtualScroll;
      const startIndex = Math.floor(sTop / rowHeight);
      this.virtualScroll.startIndex = startIndex;
      this.virtualScroll.offsetTop = startIndex * rowHeight; // startIndex之前的高度
    },
    /** 通过横向滚动条位置，计算横向虚拟滚动的参数 */
    updateVirtualScrollX(sLeft = 0) {
      if (!this.columns?.length) return;
      let startIndex = 0;
      let offsetLeft = 0;

      let colWidthSum = 0;
      for (let colIndex = 0; colIndex < this.columns.length; colIndex++) {
        startIndex++;
        const col = this.columns[colIndex];
        if (col.fixed === 'left') continue; // fixed left 不进入计算列宽
        const colWidth = parseInt(col.width || col.maxWidth || col.minWidth);
        colWidthSum += colWidth;
        // 列宽（非固定列）加到超过scrollLeft的时候，表示startIndex从上一个开始下标
        if (colWidthSum >= sLeft) {
          offsetLeft = colWidthSum - colWidth;
          // startIndex = colIndex;
          startIndex--;
          break;
        }
      }
      // -----
      colWidthSum = 0;
      let endIndex = this.columns.length;
      for (let colIndex = startIndex; colIndex < this.columns.length - 1; colIndex++) {
        const col = this.columns[colIndex];
        colWidthSum += parseInt(col.width || col.maxWidth || col.minWidth);
        // 列宽大于容器宽度则停止
        if (colWidthSum >= this.virtualScrollX.containerWidth) {
          endIndex = colIndex + 2; // TODO:预渲染的列数
          break;
        }
      }
      this.virtualScrollX.startIndex = startIndex;
      this.virtualScrollX.endIndex = endIndex;
      this.virtualScrollX.offsetLeft = offsetLeft;
    },
    /** 固定列的style */
    fixedStyle(tagType, col) {
      // let cols = [...this.tableProps]; // tbody col
      // if (tagType === 'th') {
      //   cols = [...this.tableHeaders.flat()]; // thead col
      // }
      const style = {};
      if (['left', 'right'].includes(col.fixed)) {
        // if (col.fixed === 'right') cols.reverse(); // 右边固定列要反转
        // let position = 0; // left | right 的距离
        // const fixedCols = [];
        // for (let i = 0; i < cols.length; i++) {
        //   const item = cols[i];
        //   if (item.fixed === col.fixed) fixedCols.push(item);
        //   if (item.dataIndex === col.dataIndex) break; // 遇到本列就结束循环，不再添加
        // }
        // // const unit = fixedRows[0].width.replace(/\d+/, '');
        // // -1: 不计算本列的宽度
        // for (let i = 0; i < fixedCols.length - 1; i++) {
        //   position += parseInt(fixedCols[i].width);
        // }
        // style.position = 'sticky';// sticky 方案在低版本浏览器不兼容。具体表现为横向滚动超过一个父容器宽度（非table宽度）会导致sticky吸附失效。浏览器bug。
        style.position = 'relative'; // 固定列方案替换为relative。原因:transform 在chrome84浏览器，列变动会导致横向滚动条计算出问题。
        if (col.fixed === 'left') {
          // style.left = position + 'px';
          // if (this.virtualX_on)
          //   style.transform = `translateX(${this.virtualScrollX.scrollLeft - this.virtualScrollX.offsetLeft}px)`;
          // else style.transform = `translateX(${this.virtualScrollX.scrollLeft}px)`;
          if (this.virtualX_on) style.left = this.virtualScrollX.scrollLeft - this.virtualScrollX.offsetLeft + 'px';
          else style.left = this.virtualScrollX.scrollLeft + 'px';
        } else {
          // style.right = position + 'px';
          // TODO:计算右侧距离
          style.transform = `translateX(${this.virtualX_offsetRight}px)`;
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
      return typeof this.rowKey === 'function' ? this.rowKey(row) : row[this.rowKey];
    },
    // ------event handler-------------
    /**
     * 表头点击排序
     * @param {boolean} options.force sort-remote 开启后是否强制排序
     * @param {boolean} options.emit 是否触发回调
     */
    onColumnSort(col, click = true, options = {}) {
      if (!col?.sorter) return;
      options = { force: false, emit: false, ...options };
      if (this.sortCol !== col.dataIndex) {
        // 改变排序的列时，重置排序
        this.sortCol = col.dataIndex;
        this.sortOrderIndex = 0;
      }
      if (click) this.sortOrderIndex++;

      if (this.sortOrderIndex > 2) this.sortOrderIndex = 0;
      const order = this.sortSwitchOrder[this.sortOrderIndex];

      if (!this.sortRemote || options.force) {
        this.dataSourceCopy = tableSort(col, this.dataSource, order);
      }
      // 只有点击才触发事件
      if (click || options.emit) {
        this.$emit('sort-change', col, order, [...this.dataSourceCopy]);
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
      const { scrollTop, scrollLeft } = e.target;
      // 纵向滚动有变化
      if (scrollTop !== this.virtualScroll.scrollTop) this.virtualScroll.scrollTop = scrollTop;
      if (this.virtual_on) {
        this.updateVirtualScrollY(scrollTop);
      }

      // 横向滚动有变化
      if (scrollLeft !== this.virtualScrollX.scrollLeft) this.virtualScrollX.scrollLeft = scrollLeft;
      if (this.virtualX_on) {
        this.updateVirtualScrollX(scrollLeft);
      }
      // const res = {
      //   isTop: e.target.scrollTop <= 0,
      //   isBottom: e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight,
      // };
      this.$emit('scroll', e); // vue3 不需要暴露，因为事件在根元素上
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
      // const i = Array.prototype.indexOf.call(th.parentNode.children, th); // 得到是第几个子元素
      if (this.thDrag.dragStartKey !== th.dataset.colKey) {
        this.$emit('col-order-change', this.thDrag.dragStartKey, th.dataset.colKey);
      }
      this.$emit('th-drop', th.dataset.colKey);
    },
    /** 开始拖动记录th位置 */
    onThDragStart(e) {
      // const i = Array.prototype.indexOf.call(e.target.parentNode.children, e.target); // 得到是第几个子元素
      this.thDrag.dragStartKey = e.target.dataset.colKey;
      this.$emit('th-drag-start', this.thDrag.dragStartKey);
    },
    onThDragOver(e) {
      e.preventDefault();
    },
    // ---tool func
    calcHighlightLoop() {
      if (this.calcHighlightDimLoop) return;
      console.log('asdf');
      this.calcHighlightDimLoop = true;
      // window.requestAnimationFrame(() => {
      //   const highlightRows = [...this.highlightDimRows];
      //   for (let i = 0; i < highlightRows.length; i++) {
      //     const row = highlightRows[i];
      //     row._highlight_opacity -= 0.2;
      //     if (row._highlight_opacity < 0) {
      //       row._highlight_opacity = 0;
      //       highlightRows.splice(i--, 1);
      //     }
      //   }
      //   this.highlightDimRows = new Set(highlightRows);
      //   if (highlightRows.length > 0) {
      //     this.calcHighlightLoop();
      //   } else {
      //     this.calcHighlightDimLoop = false;
      //   }
      // });
      // TODO: js计算gradient
      window.requestAnimationFrame(
        function recursion() {
          const highlightRows = [...this.highlightDimRows];
          for (let i = 0; i < highlightRows.length; i++) {
            const row = highlightRows[i];
            row._highlight_opacity -= 0.01;
            if (row._highlight_opacity < 0) {
              row._highlight_opacity = 0;
              highlightRows.splice(i--, 1);
            }
          }
          this.highlightDimRows = new Set(highlightRows);
          // this.highlightDimRows.forEach(row => {
          //   row._highlight_opacity -= 0.01;
          //   if (row._highlight_opacity < 0) {
          //     row._highlight_opacity = 0;
          //     this.highlightDimRows.delete(row);
          //   }
          // });
          if (this.highlightDimRows.size > 0) {
            window.requestAnimationFrame(recursion.bind(this));
          } else {
            this.calcHighlightDimLoop = false;
          }
        }.bind(this),
      );
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
      if (cellEl.classList.contains('highlight-cell')) {
        cellEl.classList.remove('highlight-cell');
        void cellEl.offsetHeight;
      }
      cellEl.classList.add('highlight-cell');
    },
    /** 高亮一行 */
    setHighlightDimRow(rowKeyValue) {
      if (this.virtual) {
        // 虚拟滚动用计算的的高亮方案
        const row = this.dataSource.find(it => this.rowKeyGen(it) === rowKeyValue);
        if (!row) return;
        row._highlight_opacity = 0.65;
        this.highlightDimRows.add(row);
        this.calcHighlightLoop();
      } else {
        const rowEl = this.$el.querySelector(`[data-row-key="${rowKeyValue}"]`);
        if (!rowEl) return;
        if (rowEl.classList.contains('highlight-row')) {
          rowEl.classList.remove('highlight-row');
          void rowEl.offsetWidth;
        }
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
      }
    },
    /**
     * 设置表头排序状态
     * @param {string} dataIndex 列字段
     * @param {'asc'|'desc'|null} order
     * @param {object} option.sortOption 指定排序参数
     * @param {boolean} option.silent 是否触发回调
     * @param {boolean} option.sort 是否排序
     */
    setSorter(dataIndex, order, option = {}) {
      option = { silent: true, sortOption: null, sort: true, ...option };
      this.sortCol = dataIndex;
      this.sortOrderIndex = this.sortSwitchOrder.findIndex(it => it == order);
      if (option.sort && this.dataSourceCopy?.length) {
        // 如果表格有数据，则进行排序
        const column = option.sortOption || this.columns.find(it => it.dataIndex === this.sortCol);
        if (column) this.onColumnSort(column, false, { force: true, emit: !option.silent });
        else console.warn('Can not find column by dataIndex:', this.sortCol);
      }
      return this.dataSourceCopy;
    },
    /** 重置排序 */
    resetSorter() {
      this.sortCol = null;
      this.sortOrderIndex = 0;
      this.dataSourceCopy = [...this.dataSource];
    },
    /** 滚动 */
    scrollTo(top = 0, left = 0) {
      if (top !== null) this.$refs.tableContainer.scrollTop = top;
      if (left !== null) this.$refs.tableContainer.scrollLeft = left;
    },
  },
};
</script>

<style lang="less" scoped>
.stk-table-wrapper {
  // contain: strict;
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
    border-collapse: separate;
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

        &.hover,
        &:hover {
          td {
            background-color: var(--tr-hover-bg-color);
          }
        }

        &.active {
          td {
            background-color: var(--tr-active-bg-color);
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

          //   &.perch-td {
          //     padding: 0;
          //     height: 0;
          //     &.top {
          //       background-image: repeating-linear-gradient(
          //           180deg,
          //           transparent 0,
          //           transparent var(--row-height),
          //           var(--border-color) var(--row-height),
          //           var(--border-color) calc(var(--row-height) + 1px)
          //         ),
          //         var(--bg-border-right);
          //     }
          //     &.bottom {
          //       background-image: repeating-linear-gradient(
          //           0deg,
          //           transparent 0,
          //           transparent var(--row-height),
          //           var(--border-color) var(--row-height),
          //           var(--border-color) calc(var(--row-height) + 1px)
          //         ),
          //         var(--bg-border-right);
          //     }
          //   }
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
    --border-color: #26292e;
    --tr-active-bg-color: #283f63;
    --tr-hover-bg-color: #1a2b46;
    --highlight-color: #1e4c99; // 不能用rgba，因为固定列时，会变成半透明
    // --highlight-color: rgba(34, 103, 218, 0.65);
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
            // content-visibility: auto;
            height: var(--row-height);
            line-height: var(--row-height);

            .table-cell-wrapper {
              height: inherit;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
</style>
