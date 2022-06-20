<template>
  <div class="stk-table-wrapper dark" @scroll="onTableScroll">
    <!-- 横向滚动时固定列的阴影，TODO: 覆盖一层在整个表上，使用linear-gradient 绘制阴影-->
    <!-- <div
      :class="showFixedLeftShadow && 'stk-table-fixed-left-col-box-shadow'"
      :style="{ width: fixedLeftColWidth + 'px' }"
    ></div> -->
    <table class="stk-table" :style="{ minWidth: minWidth }">
      <!-- <colgroup>
          <col v-for="(col, i) in tableProps" :key="i" :style="{}" />
        </colgroup> -->
      <thead>
        <tr v-for="(row, index) in tableHeaders" :key="index">
          <th
            v-for="(col, i) in row"
            :key="i"
            :rowspan="col.rowSpan"
            :colspan="col.colSpan"
            :style="{
              textAlign: col.headerAlign,
              width: col.width || 'auto',
              minWidth: col.fixed ? col.width : col.minWidth,
              maxWidth: col.fixed ? col.width : col.maxWidth,
              ...fixedStyle(row, i, 'th'),
            }"
            :class="{ sortable: col.sorter }"
            @click="onHeadClick(col)"
          >
            <div class="table-header-cell-wrapper">
              <component :is="col.customHeaderCell(col)" v-if="col.customHeaderCell" />
              <template v-else>
                <slot name="table-header" :column="col">
                  <span class="table-header-title">{{ col.title }}</span>
                </slot>
              </template>

              <!-- 排序图图标 -->
              <span
                v-if="col.sorter"
                class="table-header-sorter"
                :class="col.dataIndex === sortCol && 'sorter-' + sortSwitchOrder[sortOrderIndex]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16">
                  <g id="sort-btn" fill-rule="nonzero">
                    <rect id="rect" opacity="0" x="0" y="0" width="16" height="16"></rect>
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

      <tbody>
        <template v-if="dataSourceCopy && dataSourceCopy.length">
          <tr
            v-for="(item, i) in dataSourceCopy"
            :key="rowKey ? item[rowKey] : i"
            :class="{
              active: rowKey ? item[rowKey] === currentItem[rowKey] : item === currentItem,
              'highlight-row': highlightDimRows.has(item[rowKey]),
            }"
            @click="onRowClick(item)"
            @dblclick="onRowDblclick(item)"
          >
            <td
              v-for="(col, j) in tableProps"
              :key="col.dataIndex"
              :style="{
                textAlign: col.align,
                maxWidth: col.fixed ? col.width : col.maxWidth,
                textOverflow: col.textOverflow && 'ellipsis',
                overflow: col.textOverflow && 'hidden',
                ...fixedStyle(tableProps, j, 'td'),
              }"
              :title="col.textOverflow === 'title' ? item[col.dataIndex] : undefined"
              :class="{ 'highlight-cell': highlightDimCells[item[rowKey]]?.has(col.dataIndex) }"
            >
              <component :is="col.customCell(col, item)" v-if="col.customCell" />
              <span v-else> {{ item[col.dataIndex] }} </span>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td class="stk-table-no-data-cell" :colspan="tableProps.length">暂无数据</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
function _howDeepTheColumn(arr, level = 1) {
  let levels = [level];
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
    columns: {
      type: Array,
      default: () => [],
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    rowKey: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      /** 是否展示横向滚动固定列的阴影 */
      showFixedLeftShadow: false,

      /** 当前选中的一行*/
      currentItem: {},
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
      highlightDimCells: {},
      /** 高亮后渐暗的行 */
      highlightDimRows: new Set(),
    };
  },
  computed: {
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
    dataSource(val) {
      // this.dealColumns(val);
      this.dataSourceCopy = [...val];
    },
  },
  created() {
    this.dealColumns();
    this.dataSourceCopy = [...this.dataSource];
  },
  mounted() {},
  methods: {
    fixedStyle(row, index, type) {
      row = row.filter(col => col.fixed === 'left');
      if (index >= row.length) return {};
      let left = 0;
      for (let i = 0; i < index; i++) {
        const col = row[i];
        left += parseInt(col.width);
      }
      const unit = row[0].width.replace(/\d+/, '');

      let style = {
        position: 'sticky',
        left: left + unit,
      };
      if (type === 'th') {
        style.zIndex = 1;
      }
      return style;
    },
    dealColumns() {
      // reset
      this.tableHeaders = [];
      this.tableProps = [];
      let copyColumn = this.columns;
      let deep = _howDeepTheColumn(copyColumn);
      const tmpHeader = [];
      const tmpProps = [];
      // 展开columns
      (function flat(arr, level = 0) {
        let colArr = [];
        let childrenArr = [];
        arr.forEach(col => {
          col.rowSpan = col.children ? false : deep - level;
          col.colSpan = col.children?.length;
          colArr.push(col);
          if (col.children) {
            childrenArr.push(...col.children);
          } else {
            tmpProps.push(col); // 没有children的组合作为colgroup
          }
        });
        tmpHeader.push(colArr);
        if (childrenArr.length) flat(childrenArr, level + 1);
      })(copyColumn);
      this.tableHeaders = tmpHeader;
      this.tableProps = tmpProps;
    },
    /** 表头点击排序 */
    onHeadClick(col) {
      if (!col.sorter) return;
      if (this.sortCol !== col.dataIndex) {
        // 改变排序的列时，重置排序
        this.sortCol = col.dataIndex;
        this.sortOrderIndex = 0;
      }
      this.sortOrderIndex++;
      if (this.sortOrderIndex > 2) this.sortOrderIndex = 0;
      const order = this.sortSwitchOrder[this.sortOrderIndex];
      if (typeof col.sorter === 'function') {
        const customSorterData = col.sorter([...this.dataSource], { order, column: col });
        if (customSorterData) this.dataSourceCopy = customSorterData;
        else this.dataSourceCopy = [...this.dataSource]; // 还原数组
      } else if (order) {
        if (col.sortType === 'number') {
          if (order === 'asc') {
            this.dataSourceCopy.sort((a, b) => +a[col.dataIndex] - +b[col.dataIndex]);
          } else {
            this.dataSourceCopy.sort((a, b) => +b[col.dataIndex] - +a[col.dataIndex]);
          }
        } else {
          // 按string 排序
          if (order === 'asc') {
            this.dataSourceCopy.sort((a, b) => (a[col.dataIndex] < b[col.dataIndex] ? -1 : 1));
          } else {
            this.dataSourceCopy.sort((a, b) => (a[col.dataIndex] > b[col.dataIndex] ? -1 : 1));
          }
        }
      } else {
        this.dataSourceCopy = [...this.dataSource];
      }
    },
    onRowClick(row) {
      this.currentItem = row;
      this.$emit('current-change', row);
    },
    onRowDblclick(row) {
      this.$emit('row-dblclick', row);
    },
    onTableScroll() {
      // this.showFixedLeftShadow = e.target.scrollLeft > 0;
    },
    // ---- ref function-----
    /**
     * 选中一行，
     * @param {string} rowKey
     * @param {boolean} option.silent 是否触发回调
     */
    setCurrentRow(rowKey, option = { silent: false }) {
      this.currentItem = this.dataSourceCopy.find(it => it[this.rowKey] === rowKey);
      if (!option.silent) {
        this.$emit('current-change', this.currentItem);
      }
    },
    /** 高亮一个单元格 */
    setHighlightDimCell(rowKeyValue, dataIndex) {
      // this.highlightDimCells.delete(rowKey);
      if (!this.highlightDimCells[rowKeyValue]) {
        this.highlightDimCells[rowKeyValue] = new Set();
      }
      this.highlightDimCells[rowKeyValue].delete(dataIndex);
      setTimeout(() => {
        this.highlightDimCells[rowKeyValue].add(dataIndex);
      });
    },
    /** 高亮一行 */
    setHighlightDimRow(rowKeyValue) {
      this.highlightDimRows.delete(rowKeyValue);
      setTimeout(() => {
        this.highlightDimRows.add(rowKeyValue);
      });
    },
    /** 重置排序 */
    resetSorter() {
      this.sortCol = null;
      this.sortOrderIndex = 0;
      this.dataSourceCopy = [...this.dataSource];
    },
  },
};
</script>

<style lang="less" scoped>
.stk-table-wrapper {
  --border-color: #e8eaec;
  // --border: 1px #ececf7 solid;
  --td-bg-color: #fff;
  --th-bg-color: #f8f8f9;
  --tr-active-bg-color: rgb(230, 247, 255);
  --bg-border-top: linear-gradient(180deg, var(--border-color) 1px, transparent 1px);
  --bg-border-right: linear-gradient(270deg, var(--border-color) 1px, transparent 1px);
  --bg-border-bottom: linear-gradient(0deg, var(--border-color) 1px, transparent 1px);
  --bg-border-left: linear-gradient(90deg, var(--border-color) 1px, transparent 1px);
  --highlight-color: rgba(113, 162, 253, 1);
  // --highlight-color-to: rgba(113, 162, 253, 0);
  position: relative;
  overflow: auto;
  // .stk-table-fixed-left-col-box-shadow {
  //   position: sticky;
  //   left: 0;
  //   top: 0;
  //   height: 100%;
  //   box-shadow: 0 0 10px;
  //   z-index: 1;
  //   pointer-events: none;
  // }
  .stk-table {
    // position: absolute;
    // top: 0;
    border-spacing: 0;
    table-layout: fixed;
    th,
    td {
      height: 30px;
      font-size: 14px;
      box-sizing: border-box;
      padding: 2px 5px;
      overflow: hidden;
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
            padding-left: 12px;
          }
          &:last-child {
            padding-right: 12px;
          }
          .table-header-cell-wrapper {
            display: inline-flex;
            align-items: center;
            .table-header-title {
            }
            .table-header-sorter {
              margin-left: 4px;
              width: 16px;
              height: 16px;
              &:not(.sorter-desc):not(.sorter-asc):hover {
                #arrow-up {
                  fill: #8f90b5;
                }
                #arrow-down {
                  fill: #8f90b5;
                }
              }
              &.sorter-desc {
                #arrow-up {
                  fill: #cbcbe1;
                }
                #arrow-down {
                  fill: #1b63d9;
                }
              }
              &.sorter-asc {
                #arrow-up {
                  fill: #1b63d9;
                }
                #arrow-down {
                  fill: #cbcbe1;
                }
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
        to {
          background-color: var(--td-bg-color);
        }
      }
      tr {
        &.highlight-row td {
          animation: dim 2s linear;
        }
        &.active td {
          background-color: var(--tr-active-bg-color);
        }
        td {
          background-color: var(--td-bg-color);
          &:first-child {
            // border-left: 1px solid var(--border-color);
            background-image: var(--bg-border-right), var(--bg-border-bottom), var(--bg-border-left);
            padding-left: 12px;
          }
          &:last-child {
            padding-right: 12px;
          }

          &.highlight-cell {
            animation: dim 2s linear;
          }
          &.stk-table-no-data-cell {
            text-align: center;
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
}
/**深色模式 */
.stk-table-wrapper.dark {
  // --th-bg-color: #26272c;
  --th-bg-color: #181c21;
  --td-bg-color: #181c21;
  --border-color: #2e2e33;
  --tr-active-bg-color: #1a2b46;
  --highlight-color: rgba(19, 55, 125, 1);
  // --highlight-color-to: rgba(19, 55, 125, 0);
  background-color: var(--th-bg-color);
  .stk-table {
    th,
    td {
      color: #d0d1d2;
    }
    tbody {
      tr:hover td {
        box-shadow: 0px -1px 0 #1b63d9 inset;
      }
    }
  }
}
</style>
