<template>
  <div class="v-tree-select-wrapper" :class="{ disabled: disabled }">
    <!-- <input type="text" @click="onInputClick($event)" /> -->
    <div class="tree-select-main" @click="onInputClick">
      <div class="tree-select-main-label">{{ selectedTitle }}</div>
      <div class="tree-select-main-arrow" :class="{ expand: showDropdown }"></div>
    </div>
    <VirtualTree
      v-if="!disabled && showDropdown"
      class="dropdown-panel"
      style="height: 200px"
      :style="{ zIndex: zIndex + 1 }"
      v-bind="vsTreeProps"
      :replace-fields="assignedFields"
      :highlight-current="false"
      :tree-data="treeData"
      @itemClick="onTreeItemClick"
    />
    <!-- 遮罩：用于点击区域外关闭 -->
    <div v-if="!disabled && showDropdown" class="dropdown-mask" :style="{ zIndex: zIndex }" @click="showDropdown = false"></div>
  </div>
</template>
<script>
/**
 * TODO: dropdown position up down
 */
import VirtualTree from './VirtualTree.vue';

const _defaultFields = {
  key: 'key',
  title: 'title',
  children: 'children',
};
export default {
  components: { VirtualTree },
  props: {
    value: {
      type: String,
      default: '',
    },
    /** 下拉框的z-index */
    zIndex: {
      type: Number,
      default: 10,
    },
    treeData: {
      type: Array,
      default: () => [],
    },
    /** 是否禁用 */
    disabled: Boolean,
    /** 替换数据title,key,children字段 */
    replaceFields: {
      type: Object,
      default: () => _defaultFields,
    },
    /** VirtualScrollTree 的prop*/
    vsTreeProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    /** 合并传入的fields */
    assignedFields() {
      return Object.assign({}, _defaultFields, this.replaceFields);
    },
    selectedTitle() {
      return this.getItemByKey(this.value)[this.assignedFields.title];
    },
  },
  created() {},
  mounted() {},
  methods: {
    onInputClick() {
      if (this.disabled) return;
      this.showDropdown = !this.showDropdown;
    },
    onTreeItemClick(item) {
      this.showDropdown = false;
      this.$emit('change', item);
    },
    // -----------
    getItemByKey(key) {
      let result = {};
      (function recursion(dataSource) {
        for (let i = 0; i < dataSource.length; i++) {
          const item = dataSource[i];
          if (item[this.assignedFields.key] === key) {
            result = item;
            return 0;
          }
          if (item[this.assignedFields.children]) {
            let res = recursion.bind(this)(item[this.assignedFields.children] || []);
            if (res === 0) return 0;
          }
        }
      }.bind(this)(this.treeData));
      return result;
    },
  },
};
</script>
<style lang="less" scoped>
.v-tree-select-wrapper.disabled {
  .tree-select-main {
    border: 1px solid #cbcbe1;
    background-color: rgb(246, 246, 246);
    cursor: not-allowed;
    .tree-select-main-label {
      color: #ccc;
    }
  }
}
.v-tree-select-wrapper {
  position: relative;
  width: 200px;
  height: 25px;
  .tree-select-main {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
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
  /**遮罩 */
  .dropdown-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
  }
}
</style>
