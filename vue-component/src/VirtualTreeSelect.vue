<template>
  <div ref="vTreeSelect" class="v-tree-select-wrapper" :class="{ disabled: disabled }">
    <!-- <input type="text" @click="onInputClick($event)" /> -->
    <div class="tree-select-main" @click="onInputClick">
      <div class="tree-select-main-label" :class="{ placeholder: !selectedTitle }">{{ selectedTitle || placeholder }}</div>
      <div class="tree-select-main-arrow" :class="{ expand: showDropdown }"></div>
    </div>
    <!-- 下拉框 -->
    <div v-if="!disabled && showDropdown" class="dropdown-menu" :style="dropdownMenuStyle">
      <VirtualTree
        v-bind="vsTreeProps"
        height="100%"
        :replace-fields="assignedFields"
        :highlight-current="false"
        :tree-data="treeData"
        @itemClick="onTreeItemClick"
      />
    </div>
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
    /** 下拉框高度 */
    dropdownHeight: {
      type: Number,
      default: 200,
    },
    /** 下拉框的z-index */
    zIndex: {
      type: Number,
      default: 10,
    },
    placeholder: {
      type: String,
      default: '请选择',
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
      dropdownMenuStyle: {},
      showDropdown: false,
    };
  },
  computed: {
    /** 合并传入的fields */
    assignedFields() {
      return Object.assign({}, _defaultFields, this.replaceFields);
    },
    selectedTitle() {
      return this.getItemByKey(this.value)[this.assignedFields.title] || this.value;
    },
  },
  methods: {
    onInputClick(e) {
      if (this.disabled) return;
      this.setDropdownMenuStyle(e);
      this.showDropdown = !this.showDropdown;
    },
    onTreeItemClick(item) {
      this.showDropdown = false;
      this.$emit('change', item);
    },
    // -----------
    /**
     * 设置下拉框从上方弹出还是下方
     */
    setDropdownMenuStyle() {
      const rect = this.$refs.vTreeSelect.getBoundingClientRect();
      const bottom = window.innerHeight - rect.top - rect.height;
      // reset style
      this.dropdownMenuStyle = {
        position: 'absolute',
        width: rect.width + 'px',
        height: this.dropdownHeight + 'px',
        zIndex: this.zIndex + 1,
      };

      if (bottom >= this.dropdownHeight) {
        // 下方有充足空间
        this.dropdownMenuStyle.top = null;
      } else if (rect.top >= this.dropdownHeight) {
        // 上方有充足空间
        this.dropdownMenuStyle.top = -1 * this.dropdownHeight + 'px';
      } else {
        this.dropdownMenuStyle.top = 0;
        this.dropdownMenuStyle.position = 'fixed';
        this.dropdownMenuStyle.height = window.innerHeight + 'px';
      }
    },
    /** 通过key值查找一项 */
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
      &.placeholder {
        color: #bbb;
      }
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
  .dropdown-menu {
    overflow: hidden;
    border: 1px solid #ddd;
    position: absolute;
    box-sizing: border-box;
    width: 100%;
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
