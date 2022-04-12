<template>
  <div class="v-tree-select-wrapper">
    <!-- <input type="text" @click="onInputClick($event)" /> -->
    <div class="tree-select-main" @click="onInputClick($event)">
      <div class="tree-select-main-label">{{ selectedTitle }}</div>
      <div class="tree-select-main-arrow" :class="{ expand: showDropdown }"></div>
    </div>
    <VirtualScrollTree
      v-if="showDropdown"
      class="dropdown-panel"
      style="height: 200px"
      :highlight-current="false"
      :tree-data="treeData"
      @itemClick="onTreeItemClick"
    />
  </div>
</template>
<script>
/**
 * TODO: dropdown position up down
 */
import VirtualScrollTree from './VirtualScrollTree.vue';
function _getItemByKey(dataSource, key) {
  let result = {};
  (function recursion(dataSource) {
    for (let i = 0; i < dataSource.length; i++) {
      const item = dataSource[i];
      if (item.key === key) {
        result = item;
        return 0;
      }
      if (item.children) {
        let res = recursion(item.children || []);
        if (res === 0) return 0;
      }
    }
  })(dataSource);
  return result;
}
export default {
  components: { VirtualScrollTree },
  props: {
    value: {
      type: String,
      default: '',
    },
    treeData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    selectedTitle() {
      return _getItemByKey(this.treeData, this.value).title;
    },
  },
  created() {
    window.addEventListener('click', () => {
      this.showDropdown = false;
    });
  },
  mounted() {},
  methods: {
    onInputClick(e) {
      e.stopPropagation();
      this.showDropdown = !this.showDropdown;
    },
    onTreeItemClick(item) {
      this.selectedTitle = item.title;
      this.showDropdown = false;
      this.$emit('change', item.key);
    },
  },
};
</script>
<style lang="less" scoped>
.v-tree-select-wrapper {
  position: relative;
  width: 200px;
  height: 25px;
  .tree-select-main {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 2px;
    overflow: hidden;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 0 10px;
    .tree-select-main-label {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tree-select-main-arrow {
      margin-left: 10px;
      align-self: center;
      width: 0;
      height: 0;
      border-top: 5px solid #000;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 0px;
      transition: transform 0.2s ease;
      &.expand {
        transform: rotate(180deg);
      }
    }
  }
  .dropdown-panel {
    border: 1px solid #ddd;
    position: absolute;
  }
}
</style>
