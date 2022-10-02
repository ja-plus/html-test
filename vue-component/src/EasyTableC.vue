<template>
  <div ref="stkTableC" class="stk-table-compatible">
    <EasyTable
      ref="stkTableFixedLeft"
      class="stk-table-fixed-left"
      v-bind="$attrs"
      show-tr-hover-class
      :data-source="dataSourceCopy"
      :columns="fixedLeftColumns"
      :style="{ height: fixedTableHeight + 'px' }"
      @sort-change="(col, order) => handleSorterChange(col, order, 'left')"
      v-on="$listner"
    ></EasyTable>
    <EasyTable
      ref="stkTableMain"
      v-bind="$attrs"
      show-tr-hover-class
      :data-source="dataSourceCopy"
      :columns="mainTableColumns"
      @sort-change="(col, order) => handleSorterChange(col, order, 'main')"
      @scroll="handleMainTableScroll"
      v-on="$listner"
    ></EasyTable>
  </div>
</template>
<script>
import EasyTable from './EasyTable.vue';
import store from './EasyTableCStore';
export default {
  components: { EasyTable },
  props: {
    columns: {
      type: Array,
      defualt: () => [],
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fixedTableHeight: 0,
      dataSourceCopy: [],
    };
  },
  computed: {
    mainTableColumns() {
      return this.columns.map(col => {
        return {
          ...col,
          ...(col.fixed
            ? {
                minWidth: col.width,
                maxWidth: col.width,
                fixed: null,
                customCell() {
                  return {};
                },
              }
            : {}),
        };
      });
    },
    fixedLeftColumns() {
      return this.columns
        .filter(it => it.fixed === 'left')
        .map(col => {
          return { ...col, ...{ fixed: null, minWidth: col.width, maxWidth: col.width } };
        });
    },
  },
  watch: {
    dataSource(val) {
      if (val) this.dataSourceCopy = val;
    },
  },
  mounted() {
    this.initEasyTableData();
    this.fixedTableHeight = this.$refs.stkTableMain.$el.clientHeight - 1; // -1px border
    this.$refs.stkTableFixedLeft.initVirtualScroll(this.fixedTableHeight);
  },
  methods: {
    /** 初始化表格共享data */
    initEasyTableData() {
      this.$refs.stkTableFixedLeft.currentHover = store.state.currentHover;
      this.$refs.stkTableFixedLeft.currentItem = store.state.currentItem;
      this.$refs.stkTableMain.currentHover = store.state.currentHover;
      this.$refs.stkTableMain.currentItem = store.state.currentItem;
    },
    handleMainTableScroll(e) {
      // console.log(e.target.scrollTop);
      this.$refs.stkTableFixedLeft.$el.scrollTop = e.target.scrollTop;
    },
    handleSorterChange(col, order, type) {
      if (type === 'left') {
        this.$refs.stkTableMain.resetSorter();
        this.dataSourceCopy = this.$refs.stkTableFixedLeft.dataSourceCopy;
      } else if (type === 'main') {
        this.$refs.stkTableFixedLeft.resetSorter();
        this.dataSourceCopy = this.$refs.stkTableMain.dataSourceCopy;
      }
      this.$emit('sort-change', col, order);
    },
  },
};
</script>
<style lang="less" scoped>
.stk-table-compatible {
  position: relative;
  .stk-table-fixed-left {
    overflow: hidden;
    z-index: 3;
    position: absolute;
    left: 0;
    top: 0;
  }
  .stk-table-wrapper {
    height: 100%;
  }
}
</style>
