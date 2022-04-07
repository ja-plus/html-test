<template>
  <div class="easy-table" :style="{ height: height }">
    <!-- <div ref="tableHeaderScroll" class="table-header-scroll">
      <table ref="tableHeader" class="table-header">
        <colgroup>
          <col v-for="(col, i) in tableProps" :key="i" :style="{ width: (col.width || 200) + 'px' }" />
        </colgroup>
        <thead>
          <tr v-for="(row, index) in tableHeaders" :key="index">
            <th v-for="(col, i) in row" :key="i" :rowspan="col.rowSpan" :colspan="col.colSpan" :style="{ textAlign: col.align }">
              {{ col.title }}
            </th>
          </tr>
        </thead>
      </table>
    </div> -->
    <div ref="tableBodyScroll" class="table-body-scroll">
      <table class="table-body" :style="{ minWidth: minWidth }">
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
              :style="{ textAlign: col.align, width: (col.width || 10) + 'px' }"
            >
              <span class="table-header-title">{{ col.title }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataSource" :key="item.No">
            <td v-for="it in tableProps" :key="it.prop" :style="{ textAlign: it.align }">
              <span> {{ item[it.prop] }} </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
  },
  data() {
    return {
      tableHeaders: [],
      tableProps: [],
    };
  },
  computed: {},
  watch: {
    columns: {
      handler(val) {
        this.dealColumns(val);
        this.$nextTick(this.calcScrollWidth);
      },
      deep: true,
    },
    dataSource(val) {
      this.dealColumns(val);
      this.$nextTick(this.calcScrollWidth);
    },
  },
  created() {
    this.dealColumns();
  },
  mounted() {
    window.addEventListener('resize', this.calcScrollWidth);
  },
  methods: {
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
            align: col.align,
            prop: col.dataIndex,
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
    /**
     * 计算滚动条宽度
     */
    calcScrollWidth() {
      let tableBodyScroll = this.$refs.tableBodyScroll;
      let scrollBarWidth = tableBodyScroll.offsetWidth - tableBodyScroll.clientWidth;
      // this.$refs.tableHeaderScroll.style.maxWidth = `calc(100% - ${scrollBarWidth}px`;
    },
  },
};
</script>

<style lang="less" scoped>
.easy-table {
  position: relative;
  overflow: auto;
  .table-header-scroll {
    // position: absolute;
    // top: 0;
    overflow: auto;
  }
  .table-body-scroll {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  table {
    width: max-content;
    // table-layout: fixed;
    th,
    td {
      box-sizing: border-box;
      border: 1px #ececf7 solid;
      padding: 2px 5px;
      overflow: hidden;
    }
  }
  .table-header tr {
    background-color: #eee;
  }
  .table-body {
    tr:nth-child(2n) {
      background-color: #fafafc;
    }
    tr:hover {
      background-color: #ebf3ff;
    }
  }
}
</style>
