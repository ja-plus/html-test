<template>
  <div
    ref="tableContainer"
    class="stk-table"
    :class="{ virtual: virtual, 'virtual-x': virtualX, dark: theme === 'dark' }"
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
        maxWidth: maxWidth,
      }"
    >
      <!-- transform: virtualX_on ? `translateX(${virtualScrollX.offsetLeft}px)` : null, 用transform控制虚拟滚动左边距，sticky会有问题 -->
      <thead>
        <tr v-for="(row, index) in tableHeaders" :key="index" @contextmenu="e => onHeaderMenu(e)">
          <!-- 这个th用于横向虚拟滚动表格左边距,width、maxWidth 用于兼容低版本浏览器 -->
          <th
            v-if="virtualX_on"
            class="virtual-x-left"
            :style="{
              minWidth: virtualScrollX.offsetLeft + 'px',
              width: virtualScrollX.offsetLeft + 'px',
              maxWidth: virtualScrollX.offsetLeft + 'px',
            }"
          ></th>
          <th
            v-for="col in virtualX_on ? virtualX_columnPart : row"
            :key="col.dataIndex"
            :data-col-key="col.dataIndex"
            :draggable="headerDrag ? 'true' : 'false'"
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
              col.fixed ? 'fixed-cell' : '',
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
                  <g id="sort-btn">
                    <polygon id="arrow-up" fill="#757699" points="8 2 4.8 6 11.2 6"></polygon>
                    <polygon
                      id="arrow-down"
                      fill="#757699"
                      transform="translate(8, 12) rotate(-180.000000) translate(-8, -12) "
                      points="8 10 4.8 14 11.2 14"
                    ></polygon>
                  </g>
                </svg>
              </span>
            </div>
          </th>
          <!-- 这个th用于横向虚拟滚动表格右边距 width、maxWidth 用于兼容低版本浏览器-->
          <th
            v-if="virtualX_on"
            style="padding: 0"
            :style="{
              minWidth: virtualX_offsetRight + 'px',
              width: virtualScrollX.offsetLeft + 'px',
              maxWidth: virtualScrollX.offsetLeft + 'px',
            }"
          ></th>
        </tr>
      </thead>

      <!-- 用于虚拟滚动表格内容定位 @deprecated 有兼容问题-->
      <!-- <tbody v-if="virtual_on" :style="{ height: `${virtualScroll.offsetTop}px` }">
        <!==这个tr兼容火狐==>
        <tr></tr>
      </tbody> -->
      <!-- <td
          v-for="col in virtualX_on ? virtualX_columnPart : tableProps"
          :key="col.dataIndex"
          class="perch-td top"
        ></td> -->
      <!-- <tbody :style="{ transform: `translateY(${virtualScroll.offsetTop}px)` }"> -->
      <tbody>
        <tr v-if="virtual_on" :style="{ height: `${virtualScroll.offsetTop}px` }"></tr>
        <template v-if="dataSourceCopy && dataSourceCopy.length">
          <tr
            v-for="(row, i) in virtual_dataSourcePart"
            :key="rowKey ? rowKeyGen(row) : i"
            :data-row-key="rowKey ? rowKeyGen(row) : i"
            :class="{
              active: rowKey
                ? rowKeyGen(row) === (currentItem.value && rowKeyGen(currentItem.value))
                : row === currentItem.value,
              hover: rowKey ? rowKeyGen(row) === currentHover.value : row === currentHover.value,
            }"
            @click="e => onRowClick(e, row)"
            @dblclick="e => onRowDblclick(e, row)"
            @contextmenu="e => onRowMenu(e, row)"
            @mouseover="e => onTrMouseOver(e, row)"
          >
            <!--这个td用于配合虚拟滚动的th对应，防止列错位-->
            <td v-if="virtualX_on" class="virtual-x-left" style="padding: 0"></td>
            <td
              v-for="col in virtualX_on ? virtualX_columnPart : tableProps"
              :key="col.dataIndex"
              :data-index="col.dataIndex"
              :class="[col.className, showOverflow ? 'text-overflow' : '', col.fixed ? 'fixed-cell' : '']"
              :style="{
                textAlign: col.align,
                width: col.width,
                minWidth: col.minWidth || col.width,
                maxWidth: col.maxWidth || col.width,
                backgroundColor: row._bgc,
                ...fixedStyle('td', col),
              }"
              @click="e => onCellClick(e, row, col)"
            >
              <component
                :is="typeof col.customCell === 'function' ? col.customCell(col, row) : col.customCell"
                v-if="col.customCell"
                :col="col"
                :row="row"
              />
              <div v-else class="table-cell-wrapper" :title="row[col.dataIndex]">
                {{ row[col.dataIndex] ?? emptyCellText }}
              </div>
            </td>
          </tr>
          <tr v-if="virtual_on" :style="{ height: `${virtual_offsetBottom}px` }"></tr>
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
 * @version 1.0.7
 * @author JA+
 * 不支持低版本浏览器非虚拟滚动表格的表头固定，列固定，因为会卡。
 * TODO:存在的问题：
 * [] column.dataIndex 作为唯一键，不能重复
 * [] 计算的高亮颜色，挂在数据源上对象上，若多个表格使用同一个数据源对象会有问题。需要深拷贝。(解决方案：获取组件uid)
 *
 */
import { interpolateRgb } from 'd3-interpolate';
let chromeVersion = 0;
try {
  chromeVersion = +navigator.userAgent.match(/chrome\/\d+/i)[0].split('/')[1];
} catch (e) {
  console.error('获取浏览器版本出错！', e);
}
/** 高亮背景色 */
const _highlightColor = {
  light: { from: '#71a2fd', to: '#fff' },
  dark: { from: '#1e4c99', to: '#181c21' },
};
/** 高亮持续时间 */
const _highlightDuration = 2000;
/** 高亮变更频率 */
const _highlightColorChangeFreq = 100;

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
 * 对有序数组插入新数据
 * @param {object} sortState
 * @param {string} sortState.dataIndex 排序的列
 * @param {null|'asc'|'desc'} sortState.order 排序顺序
 * @param {'number'|'string'} [sortState.sortType] 排序方式
 * @param {object} newItem 要插入的数据
 * @param {Array} targetArray 表格数据
 */
export function insertToOrderedArray(sortState, newItem, targetArray) {
  let { dataIndex, order, sortType } = sortState;
  if (!sortType) sortType = typeof newItem[dataIndex];
  const data = [...targetArray];
  if (!order) {
    data.unshift(newItem);
    return data;
  }
  // 二分插入
  let sIndex = 0;
  let eIndex = data.length - 1;
  const targetVal = newItem[dataIndex];
  while (eIndex > sIndex) {
    // console.log(sIndex, eIndex);
    const midIndex = Math.floor((sIndex + eIndex) / 2);
    const midVal = data[midIndex][dataIndex];
    if (order === 'asc') {
      if (strCompare(midVal, targetVal, sortType) === 1) {
        eIndex = midIndex > 0 ? midIndex - 1 : 0;
      } else {
        sIndex = midIndex + 1;
      }
    } else if (order === 'desc') {
      if (strCompare(midVal, targetVal, sortType) === 1) {
        sIndex = midIndex + 1;
      } else {
        eIndex = midIndex > 0 ? midIndex - 1 : 0;
      }
    }
  }
  // console.log('startIndex', sIndex);
  // 与eIndex 的数据比较大小，选择插入在前方还是后方
  const lastVal = data[eIndex][dataIndex];
  if (order === 'asc') {
    if (strCompare(targetVal, lastVal, sortType) === 1) data.splice(eIndex + 1, 0, newItem);
    else data.splice(sIndex, 0, newItem);
  } else if (order === 'desc') {
    if (strCompare(targetVal, lastVal, sortType) === -1) data.splice(eIndex + 1, 0, newItem);
    else data.splice(sIndex, 0, newItem);
  }
  return data;
}
/**
 * 字符串比较
 * @param {string} a
 * @param {string} b
 * @param {'number'|'string'} [type] 类型
 * @return {-1|0|1}
 */
function strCompare(a, b, type) {
  // if (typeof a === 'number' && typeof b === 'number') type = 'number';
  if (type === 'number') {
    if (+a > +b) return 1;
    if (+a === +b) return 0;
    if (+a < +b) return -1;
  } else {
    return String(a).localeCompare(b);
  }
}

/**
 * @typedef SortOption
 * @prop {function|boolean} sorter
 * @prop {string} dataIndex
 * @prop {string} sortField
 * @prop {'number'|'string'} sortType
 */
/**
 * 表格排序抽离
 * 可以在组件外部自己实现表格排序，组件配置remote，使表格不排序。
 * 使用者在@sort-change事件中自行更改table props 'dataSource'完成排序。
 * @param {SortOption} sortOption 列配置
 * @param {string|null} order 排序方式
 * @param {any} dataSource 排序的数组
 */
export function tableSort(sortOption, order, dataSource) {
  let targetDataSource = [...dataSource];
  if (typeof sortOption.sorter === 'function') {
    const customSorterData = sortOption.sorter(targetDataSource, { order, column: sortOption });
    if (customSorterData) targetDataSource = customSorterData;
  } else if (order) {
    const sortField = sortOption.sortField || sortOption.dataIndex;
    let { sortType } = sortOption;
    if (!sortType) sortType = typeof dataSource[0][sortField];

    if (sortType === 'number') {
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
    /**表格最大宽度，设置max-content 使表格按设置的width来 */
    maxWidth: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default: 'light',
      validator: v => ['dark', 'light'].includes(v),
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
    /**表头是否可拖动 */
    headerDrag: {
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
      /** 是否展示横向滚动固定列的阴影 
      showFixedLeftShadow: false,*/

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
      /** 存放高亮行的对象*/
      highlightDimRows: new Set(),
      /** 高亮后渐暗的行定时器 */
      highlightDimRowsTimeout: new Map(),
      /** 是否正在计算高亮行的循环*/
      calcHighlightDimLoop: false,
      virtualScroll: {
        containerHeight: 0,
        startIndex: 0, // 数组开始位置
        rowHeight: 28,
        offsetTop: 0, // 表格定位上边距
        scrollTop: 0, // 纵向滚动条位置，用于判断是横向滚动还是纵向
      },
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
    isLegacyMode() {
      return chromeVersion < 56;
    },
    /** 高亮颜色插值方法 */
    highlightInter() {
      return interpolateRgb(_highlightColor[this.theme].from, _highlightColor[this.theme].to);
    },

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
      if (!this.virtual_on) return 0;
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
    /** 计算每个fixed:left列前面列的总宽度，fixed:right右边列的总宽度，用于定位 */
    fixedColumnsPositionStore() {
      const store = {};
      const cols = [...this.columns];
      let left = 0;
      for (let i = 0; i < cols.length; i++) {
        const item = cols[i];
        if (item.fixed === 'left') {
          store[item.dataIndex] = left;
          left += parseInt(item.width);
        }
      }
      let right = 0;
      for (let i = cols.length - 1; i >= 0; i--) {
        const item = cols[i];
        if (item.fixed === 'right') {
          store[item.dataIndex] = right;
          right += parseInt(item.width);
        }
      }

      return store;
    },
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
    dataSource: {
      handler(val) {
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
      deep: false, // TODO:prop 控制监听
    },
  },
  created() {
    this.dealColumns();
    this.dataSourceCopy = [...this.dataSource];
  },
  mounted() {
    this.initVirtualScroll();
    // 通过wheel 模拟scroll事件，passive:false 使合成器线程等待主线程
    // this.$refs.tableContainer.addEventListener(
    //   'wheel',
    //   e => {
    //     e.preventDefault();
    //     const event = {
    //       target: {
    //         scrollTop: this.$refs.tableContainer.scrollTop + (e.deltaY > 0 ? 60 : -60),
    //         scrollLeft: 0,
    //       },
    //     };
    //     this.onTableScroll(event);
    //     this.$refs.tableContainer.scrollTop = event.target.scrollTop < 0 ? 0 : event.target.scrollTop;
    //   },
    //   { passive: false },
    // );
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
      const style = {};
      if (chromeVersion < 56) {
        if (tagType === 'th') {
          style.position = 'relative';
          style.top = this.virtualScroll.scrollTop + 'px';
        }
      }
      if (['left', 'right'].includes(col.fixed)) {
        if (this.isLegacyMode) {
          /**
           * ----------浏览器兼容--------------
           */
          style.position = 'relative'; // 固定列方案替换为relative。原因:transform 在chrome84浏览器，列变动会导致横向滚动条计算出问题。
          if (col.fixed === 'left') {
            if (this.virtualX_on) style.left = this.virtualScrollX.scrollLeft - this.virtualScrollX.offsetLeft + 'px';
            else style.left = this.virtualScrollX.scrollLeft + 'px';
          } else {
            // TODO:计算右侧距离
            style.transform = `translateX(${this.virtualX_offsetRight}px)`;
          }
          if (tagType === 'th') {
            style.top = this.virtualScroll.scrollTop + 'px';
            style.zIndex = 2; // 保证固定列高于其他单元格
          }
        } else {
          /**
           * -------------高版本浏览器----------------
           */
          style.position = 'sticky'; // sticky 方案在低版本浏览器不兼容。具体表现为横向滚动超过一个父容器宽度（非table宽度）会导致sticky吸附失效。浏览器bug。
          if (col.fixed === 'left') {
            style.left = this.fixedColumnsPositionStore[col.dataIndex] + 'px';
          } else {
            style.right = this.fixedColumnsPositionStore[col.dataIndex] + 'px';
          }
          if (tagType === 'th') {
            style.top = '0px';
            style.zIndex = 2; // 保证固定列高于其他单元格
          }
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
      this.sortOrderIndex = this.sortOrderIndex % 3;

      const order = this.sortSwitchOrder[this.sortOrderIndex];

      if (!this.sortRemote || options.force) {
        this.dataSourceCopy = tableSort(col, order, this.dataSource);
      }
      // 只有点击才触发事件
      if (click || options.emit) {
        this.$emit('sort-change', col, order, [...this.dataSourceCopy]);
      }
    },
    /** 插入一行 
    insertData(data) {
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
      // 此处可优化，因为访问e.target.scrollXX消耗性能
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
      this.$emit('scroll', e);
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
    /**
     * 计算高亮渐暗颜色的循环
     * FIXME: 相同数据源，相同引用的情况，将颜色值挂在数据源对象上，在多个表格使用相同数据源时会出问题。
     */
    calcHighlightLoop() {
      if (this.calcHighlightDimLoop) return;
      this.calcHighlightDimLoop = true;
      // js计算gradient
      // raf 太频繁。考虑setTimeout分段设置颜色，过渡靠css transition 补间
      const recursion = () => {
        window.setTimeout(() => {
          const highlightRows = [...this.highlightDimRows];
          const nowTs = Date.now();
          for (let i = 0; i < highlightRows.length; i++) {
            const row = highlightRows[i];
            // const rowKeyValue = this.rowKeyGen(row);
            // const rowEl = this.$el.querySelector(`[data-row-key="${rowKeyValue}"]`);
            //  经过的时间 ÷ 2s 计算出 颜色过渡进度 (0-1)
            const progress = (nowTs - row._bgc_progress) / _highlightDuration;
            if (progress <= 1) {
              row._bgc = this.highlightInter(progress);
            } else {
              row._bgc = ''; // 清空颜色
              highlightRows.splice(i--, 1);
            }
          }
          this.highlightDimRows = new Set(highlightRows);

          if (this.highlightDimRows.size > 0) {
            // 还有高亮的行,则下一次循环
            recursion();
          } else {
            // 没有则停止循环
            this.calcHighlightDimLoop = false;
          }
        }, _highlightColorChangeFreq);
      };
      recursion();
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
      // TODO: 支持动态计算高亮颜色。不易实现。需记录每一个单元格的颜色情况。
      const cellEl = this.$el.querySelector(`[data-row-key="${rowKeyValue}"]>[data-index="${dataIndex}"]`);
      if (!cellEl) return;
      if (cellEl.classList.contains('highlight-cell')) {
        cellEl.classList.remove('highlight-cell');
        void cellEl.offsetHeight; // 通知浏览器重绘
      }
      cellEl.classList.add('highlight-cell');
    },
    /**
     * 高亮一行
     * @param {Array<string|number>} rowKeyValues
     */
    setHighlightDimRow(rowKeyValues) {
      if (!Array.isArray(rowKeyValues)) rowKeyValues = [rowKeyValues];
      if (this.virtual) {
        // --------虚拟滚动用js计算颜色渐变的高亮方案
        const nowTs = Date.now(); // 重置渐变进度
        for (let i = 0; i < rowKeyValues.length; i++) {
          const rowKeyValue = rowKeyValues[i];

          const row = this.dataSource.find(it => this.rowKeyGen(it) === rowKeyValue);
          if (!row) continue;
          row._bgc_progress = nowTs;
          this.highlightDimRows.add(row);
        }
        this.calcHighlightLoop();
      } else {
        // -------- 普通滚动用css @keyframes动画，实现高亮
        /**是否需要重绘 */
        let needRepaint = false;
        for (let i = 0; i < rowKeyValues.length; i++) {
          const rowKeyValue = rowKeyValues[i];
          /**@type {HTMLElement|null} */
          const rowEl = this.$el.querySelector(`[data-row-key="${rowKeyValue}"]`);
          if (!rowEl) continue;
          if (rowEl.classList.contains('highlight-row')) {
            rowEl.classList.remove('highlight-row');
            needRepaint = true;
          }
          rowEl.classList.add('highlight-row');
          // 动画结束移除class
          window.clearTimeout(this.highlightDimRowsTimeout.get(rowKeyValue));
          this.highlightDimRowsTimeout.set(
            rowKeyValue,
            window.setTimeout(() => {
              rowEl.classList.remove('highlight-row');
              this.highlightDimRowsTimeout.delete(rowKeyValue); // 回收内存
            }, _highlightDuration),
          );
        }
        if (needRepaint) {
          void this.$el.offsetWidth; //强制浏览器重绘
        }
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
      this.sortOrderIndex = this.sortSwitchOrder.findIndex(it => it === order);
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

    /** 获取当前状态的表格数据 */
    getTableData() {
      return [...this.dataSourceCopy];
    },
  },
};
</script>

<style lang="less" scoped>
.stk-table {
  // contain: strict;
  --row-height: 28px;
  --border-color: #e8eaec;
  --border-width: 1px;
  --td-bg-color: #fff;
  --th-bg-color: #f8f8f9;
  --tr-active-bg-color: rgb(230, 247, 255);
  --tr-hover-bg-color: rgba(230, 247, 255, 0.7);
  --bg-border-top: linear-gradient(180deg, var(--border-color) var(--border-width), transparent var(--border-width));
  --bg-border-right: linear-gradient(270deg, var(--border-color) var(--border-width), transparent var(--border-width));
  --bg-border-bottom: linear-gradient(0deg, var(--border-color) var(--border-width), transparent var(--border-width));
  --bg-border-left: linear-gradient(90deg, var(--border-color) var(--border-width), transparent var(--border-width));
  --highlight-color: #71a2fd;

  --sort-arrow-color: #5d5f69;
  --sort-arrow-hover-color: #8f90b5;
  --sort-arrow-active-color: #1b63d9;
  --sort-arrow-active-sub-color: #cbcbe1;
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
  /**深色模式 */
  &.dark {
    --th-bg-color: #181c21;
    --td-bg-color: #181c21;
    --border-color: #26292e;
    --tr-active-bg-color: #283f63;
    --tr-hover-bg-color: #1a2b46;
    --highlight-color: #1e4c99; // 不能用rgba，因为固定列时，会变成半透明
    --sort-arrow-color: #5d6064;
    --sort-arrow-hover-color: #727782;
    --sort-arrow-active-color: #d0d1d2;
    --sort-arrow-active-sub-color: #5d6064;

    background-color: var(--th-bg-color);
    color: #d0d1d2;
  }

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
    table-layout: fixed; // 似乎不需要

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
            background-image: var(--bg-border-right), var(--bg-border-bottom), var(--bg-border-left);
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

        &.active td {
          background-color: var(--tr-active-bg-color);
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
    left: 0px;
    border-left: var(--border-width) solid var(--border-color);
    border-right: var(--border-width) solid var(--border-color);
    border-bottom: var(--border-width) solid var(--border-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &.no-data-full {
      flex: 1;
    }
  }

  /**虚拟滚动模式 */
  &.virtual {
    // .virtual-table-height {
    //   width: 1px;
    //   z-index: -2;
    //   position: absolute;
    // }

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
  &.virtual-x {
    .stk-table-main {
      .virtual-x-left {
        padding: 0;
      }
      thead tr:first-child .virtual-x-left + th {
        // 横向虚拟滚动时，左侧第一个单元格加上border-left
        background-image: var(--bg-border-top), var(--bg-border-right), var(--bg-border-bottom), var(--bg-border-left);
      }
      tr .virtual-x-left + th {
        background-image: var(--bg-border-right), var(--bg-border-bottom), var(--bg-border-left);
      }
    }
  }
}
</style>
