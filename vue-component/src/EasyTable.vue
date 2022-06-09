<template>
  <div class="stk-table-wrapper" :style="{ height: height }">
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
              minWidth: col.minWidth,
              ...fixedStyle(row, i, 'th'),
            }"
            :class="{ sortable: col.sorter }"
            @click="onHeadClick(col)"
          >
            <span class="table-header-title">{{ col.title }}</span>
            <span v-if="col.sorter" class="table-header-sorter" :class="sortOrder[sortOrderIndex]">
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
        <tr v-for="(item, i) in dataSource" :key="rowKey ? item[rowKey] : i">
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
      sortCol: '',
      sortOrderIndex: 0,
      sortOrder: [null, 'desc', 'asc'],
      tableHeaders: [],
      /** 若有多级表头时，的tableHeaders */
      tableProps: [],
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
      this.dealColumns(val);
    },
  },
  created() {
    this.dealColumns();
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
          let colObj = {
            title: col.title,
            rowSpan: col.children ? false : deep - level,
            colSpan: col.children?.length,
            width: col.width,
            minWidth: col.minWidth,
            align: col.align,
            headerAlign: col.headerAlign,
            dataIndex: col.dataIndex,
            fixed: col.fixed,
            sorter: col.sorter,
          };
          colArr.push(colObj);
          if (col.children) {
            childrenArr.push(...col.children);
          } else {
            tmpProps.push(colObj); // 没有children的组合作为colgroup
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
      this.sortCol = col.dataIndex;
      this.sortOrderIndex++;
      if (this.sortOrderIndex > 2) this.sortOrderIndex = 0;
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
    border-spacing: 0;
    table-layout: fixed;
    th,
    td {
      background-color: #fff;
      box-sizing: border-box;
      border-bottom: var(--border);
      border-right: var(--border);
      padding: 2px 5px;
      overflow: hidden;
    }
    thead {
      tr:first-child {
        th {
          position: sticky;
          top: 0;
          border-top: var(--border);
        }
      }
      tr th:first-child {
        border-left: var(--border);
      }
      th {
        .table-header-title {
        }
        &.sortable {
          cursor: pointer;
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
    tbody {
      tr {
        td:first-child {
          border-left: var(--border);
        }
      }
      tr td {
        background-color: #fff;
      }
      tr:nth-child(2n) td {
        background-color: #fafafc;
      }
      tr:hover {
        background-color: #ebf3ff;
      }
    }
  }
}
</style>
