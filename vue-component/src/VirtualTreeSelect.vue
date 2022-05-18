<template>
  <div ref="vTreeSelect" class="v-tree-select-wrapper" :class="{ disabled: disabled }">
    <!-- <input type="text" @click="onInputClick($event)" /> -->
    <div class="tree-select-main" :class="{ expand: showDropdown }" @click="onInputClick">
      <div class="tree-select-main-label" :class="{ placeholder: !selectedLabel }">{{ selectedLabel || placeholder }}</div>
      <div class="tree-select-main-arrow"></div>
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
    /** 格式化选中展示的label */
    labelFormatter: {
      type: Function,
      default: null,
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
    selectedLabel() {
      let label = '';
      let item = this.getItemByKey(this.value);
      if (item) {
        if (this.labelFormatter) {
          label = this.labelFormatter(item);
        } else {
          label = item[this.assignedFields.title];
        }
      }
      return label || this.value;
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
      let result = null;
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
::v-deep .vtScroll-tree ul li .list-item:hover:not(.item-highlight) {
  background-color: #f7f7fc;
}

.v-tree-select-wrapper.disabled {
  .tree-select-main {
    border: 1px solid #cbcbe1;
    background-color: rgb(246, 246, 246);
    cursor: not-allowed;
    .tree-select-main-label {
      color: #ccc;
    }
    .tree-select-main-arrow {
      border-top: 5.5px solid #ccc;
    }
  }
}
.v-tree-select-wrapper {
  position: relative;
  width: 200px;
  height: 25px;
  transition: all 0.3s;
  &:hover:not(.disabled) {
    .tree-select-main {
      border: 1px solid #8f90b5;
    }
  }
  .tree-select-main {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 0 10px;
    transition: all 0.3s;
    &.expand {
      border: 1px solid #8f90b5;
      .tree-select-main-arrow {
        border-top: 5.5px solid #4a4b72;
        transform: rotate(180deg);
      }
    }
    .tree-select-main-label {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      &.placeholder {
        color: #7d7d94;
      }
    }
    .tree-select-main-arrow {
      margin-left: 10px;
      align-self: center;
      width: 0;
      height: 0;
      border-top: 5.5px solid #757699;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
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
    // min-width: max-content;
    margin-top: 2px;
    border-radius: 4px;
    outline: none;
    box-shadow: 0 4px 12px rgba(10, 39, 86, 0.15);
    border: 1px solid #ececf7;
    // ::v-deep .vtScroll-tree {
    //   min-width: max-content;
    // }
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
