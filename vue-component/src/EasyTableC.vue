<template>
  <div ref="stkTableC" class="stk-table-compatible">
    <EasyTable
      ref="stkTableFixedLeft"
      class="stk-table-fixed-left"
      v-bind="$attrs"
      :columns="fixedLeftColumns"
      :style="{ height: fixedTableHeight + 'px' }"
    ></EasyTable>
    <EasyTable ref="stkTableMain" v-bind="$attrs" :columns="mainTableColumns"></EasyTable>
  </div>
</template>
<script>
import EasyTable from './EasyTable.vue';
export default {
  components: { EasyTable },
  props: {
    columns: {
      type: Array,
      defualt: () => [],
    },
  },
  data() {
    return {
      fixedTableHeight: 0,
    };
  },
  computed: {
    mainTableColumns() {
      return this.columns.map(col => {
        return {
          ...col,
          ...(col.fixed
            ? {
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
          return { ...col, ...{ fixed: null } };
        });
    },
  },
  mounted() {
    this.fixedTableHeight = this.$refs.stkTableMain.$el.clientHeight - 1; // -1px border
    this.$refs.stkTableFixedLeft.initVirtualScroll(this.fixedTableHeight);
  },
};
</script>
<style lang="less" scoped>
.stk-table-compatible {
  position: relative;
  .stk-table-fixed-left {
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
