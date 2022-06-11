<template>
  <div class="stk-table-wrapper" :style="{ height: height }">
    <table class="stk-table dark" :style="{ minWidth: minWidth }">
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
              minWidth: col.minWidth,
              ...fixedStyle(row, i, 'th'),
            }"
            :class="{ sortable: col.sorter }"
            @click="onHeadClick(col)"
          >
            <slot name="table-header" :column="col">
              <span class="table-header-title">{{ col.title }}</span>
            </slot>
            <!-- <component :is="col.customHeaderCell(col)" v-if="col.customHeaderCell" />
            <span v-else class="table-header-title">{{ col.title }}</span> -->

            <!-- 排序图图标 -->
            <span
              v-if="col.sorter"
              class="table-header-sorter"
              :class="col.dataIndex === sortCol && sortOrder[sortOrderIndex]"
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
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, i) in dataSourceCopy"
          :key="rowKey ? item[rowKey] : i"
          :class="{ active: item === currentItem }"
          @click="onRowClick(item)"
        >
          <td
            v-for="(it, j) in tableProps"
            :key="it.dataIndex"
            :style="{ textAlign: it.align, ...fixedStyle(tableProps, j, 'td') }"
          >
            <span> {{ item[it.dataIndex] }} </span>
          </td>
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
    height: {
      type: String,
      default: '100%',
    },
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
      currentItem: {}, // 当前选中的一行
      sortCol: '',
      sortOrderIndex: 0,
      sortOrder: [null, 'desc', 'asc'],
      tableHeaders: [],
      /** 若有多级表头时，的tableHeaders */
      tableProps: [],
      dataSourceCopy: [],
    };
  },
  computed: {},
  watch: {
    columns: {
      handler(val) {
        this.dealColumns(val);
      },
      deep: true,
    },
    dataSource(val) {
      // this.dealColumns(val);
      this.dataSourceCopy = val;
    },
  },
  created() {
    this.dealColumns();
    this.dataSourceCopy = [...this.dataSource];
  },
  mounted() {},
  methods: {
    fixedStyle(row, index, type) {
      row = row.filter(col => col.fixed);
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
      const order = this.sortOrder[this.sortOrderIndex];
      if (order) {
        if (order === 'asc') {
          this.dataSourceCopy.sort((a, b) => (a[this.sortCol] < b[this.sortCol] ? -1 : 1));
        } else {
          this.dataSourceCopy.sort((a, b) => (a[this.sortCol] > b[this.sortCol] ? -1 : 1));
        }
      } else {
        this.dataSourceCopy = [...this.dataSource];
      }
    },
    onRowClick(row) {
      this.currentItem = row;
      this.$emit('current-change', row);
    },
  },
};
</script>

<style lang="less" scoped>
.stk-table-wrapper {
  position: relative;
  overflow: auto;
  .stk-table {
    --border: 1px #ececf7 solid;
    --td-bg-color: #fff;
    --th-bg-color: #eee;
    --tr-active-bg-color: rgb(230, 247, 255);
    border-spacing: 0;
    table-layout: fixed;
    th,
    td {
      height: 30px;
      font-size: 14px;
      box-sizing: border-box;
      border-bottom: var(--border);
      border-right: var(--border);
      padding: 2px 5px;
      overflow: hidden;
      padding: 0 8px;
    }
    thead {
      tr {
        &:first-child th {
          position: sticky;
          top: 0;
          border-top: var(--border);
        }
        th {
          background-color: var(--th-bg-color);
          .table-header-title {
          }
          &.sortable {
            cursor: pointer;
          }
          &:first-child {
            border-left: var(--border);
            padding-left: 12px;
          }
          &:last-child {
            padding-right: 12px;
          }
          .table-header-sorter {
            &:not(.sorter-desc):not(.sorter-asc):hover {
              #arrow-up {
                fill: #8f90b5;
              }
              #arrow-down {
                fill: #8f90b5;
              }
            }
            &.desc {
              #arrow-up {
                fill: #cbcbe1;
              }
              #arrow-down {
                fill: #1b63d9;
              }
            }
            &.asc {
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
    tbody {
      tr {
        &.active td {
          background-color: var(--tr-active-bg-color);
        }
        td {
          &:first-child {
            padding-left: 12px;
          }
          &:last-child {
            padding-right: 12px;
          }
          background-color: var(--td-bg-color);
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

  .stk-table.dark {
    --th-bg-color: #26272c;
    --td-bg-color: #181c21;
    --border: 1px #2e2e33 solid;
    --tr-active-bg-color: #1a2b46;
    th,
    td {
      color: #d0d1d2;
    }
    tbody {
      tr:hover td {
        border-bottom: 1px solid #1b63d9;
      }
    }
  }
}
</style>
