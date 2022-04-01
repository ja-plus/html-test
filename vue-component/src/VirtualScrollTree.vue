<template>
  <div ref="container" class="vtScroll-tree" :style="{ height: height }">
    <ul v-if="displayList.length" :style="ulStyle">
      <li v-for="item in displayList" :key="item[assignedFields.key]">
        <div
          class="list-item"
          :class="{ isSelected: item.isCurrent }"
          :style="{
            height: lineHeight + 'px',
            paddingLeft: indentWidth * item.level + 'px',
            fontWeight: item.isParent ? 'bold' : 'normal',
          }"
          @click="selectChange(item)"
          @dblclick="onDblClick(item)"
          @contextmenu="e => onContextMenu(e, item)"
        >
          <!-- 展开箭头 -->
          <div v-if="item.isParent" class="list-item-expand" @click.stop="changeList(item)">
            <div class="list-item-arrow" :class="{ 'list-item-arrow-active': item.isExpand }"></div>
            <!-- TODO: slot 箭头样式 -->
          </div>
          <!-- 文字 -->
          <div class="list-item-title" :style="{ marginLeft: !item.isParent ? '10px' : 0 }" :title="item[assignedFields.title]">
            <span>{{ item[assignedFields.title] }}</span>
            <!-- TODO:slot? -->
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="vtScroll-empty">暂无数据</div>
  </div>
</template>

<script>
const _defaultFields = {
  key: 'key',
  title: 'title',
  children: 'children',
};
export default {
  name: 'VirtualScrollTree',
  props: {
    /** 树高度 默认auto */
    height: {
      type: String,
      default: 'auto',
    },
    /** 行高 */
    lineHeight: {
      type: Number,
      default: 30,
    },
    /** 缩进距离 */
    indentWidth: {
      type: Number,
      default: 20,
    },
    /** 是否支持多选 */
    multiple: {
      type: Boolean,
      default: false,
    },
    /** 父节点是否可选中 */
    parentSelectable: {
      type: Boolean,
      default: false,
    },
    /** 数据 */
    treeData: {
      type: Array,
      default: () => [],
    },
    /** 默认展开的键数组 */
    defaultExpandedKeys: {
      type: Array,
      default: () => [],
    },
    /** 默认选中的项数组 TODO: 不能用 */
    defaultSelectedKeys: {
      type: Array,
      default: () => [],
    },
    /** 替换数据title,key,children字段 */
    replaceFields: {
      type: Object,
      default: () => _defaultFields,
    },
  },
  data() {
    return {
      rootEl: null, // 根元素
      treeDataFlat: [], // 展平的一维数组
      selectedItems: [], // 多选选中
      // v scroll
      startIndex: 0,
      endIndex: 30,
      marginTop: 0,
      marginBottom: 0,
      pageSize: 30,
    };
  },
  computed: {
    /** 合并传入的fields */
    assignedFields() {
      return Object.assign({}, _defaultFields, this.replaceFields);
    },
    ulStyle() {
      return {
        marginTop: this.marginTop + 'px',
        marginBottom: this.marginBottom + 'px',
      };
    },
    /** 实际显示的列表*/
    displayList() {
      return this.treeDataFlat.slice(this.startIndex, this.endIndex);
    },
    /** 总高度 */
    allHeight() {
      return this.treeDataFlat.length * this.lineHeight;
    },
  },
  watch: {
    treeData() {
      // 列表发生改变，重置已选，重置虚拟滚动
      this.reset();
    },
  },
  mounted() {
    this.reset();
    this.init();

    // event listener
    this.rootEl.addEventListener('scroll', this.setIndex);
    window.addEventListener('resize', () => {
      this.$nextTick(this.init);
    });
  },
  methods: {
    init() {
      this.rootEl = document.querySelector('.vtScroll-tree');
      const containerHeight = this.rootEl.offsetHeight;
      this.pageSize = Math.ceil(containerHeight / this.lineHeight) + 1; // +1 考虑上下各半行情况
      this.startIndex = 0;
      this.endIndex = this.pageSize;
    },
    // 列表总数据改变，重置已选，重置虚拟滚动
    reset() {
      this.selectedItems = [];
      this.setTreeDataFlat('reset');
      this.setDefaultSelect(); // 设置默认选中状态
      this.marginTop = 0;
      this.marginBottom = this.allHeight - this.displayList.length * this.lineHeight;
    },
    setDefaultSelect() {
      this.treeDataFlat.forEach(obj => {
        obj.isCurrent = this.defaultSelectedKeys.includes(obj[this.assignedFields.key]);
        // this.$set(obj, 'isCurrent', this.defaultSelectedKeys.includes(obj[this.assignedFields.key]));
      });
    },
    /**
     * 设置当前展开数组
     * @param {String} type 'reset'
     */
    setTreeDataFlat(type) {
      const treeDataFlat = [];
      const that = this;
      // level 树层级
      (function func(arr, level = 0) {
        arr.forEach(item => {
          item.isParent = Boolean(item[that.assignedFields.children]);
          item.level = level;
          if (!item.isParent) {
            item.isCurrent = false; // 取消选中叶子节点
          }
          treeDataFlat.push(item);
          if (type === 'reset') {
            item.isExpand = that.defaultExpandedKeys.includes(item[that.assignedFields.key]);
          }
          if (item.isExpand) {
            func(item[that.assignedFields.children] || [], level + 1);
          }
        });
      })(this.treeData);

      this.treeDataFlat = treeDataFlat;
    },
    /** 展开收起事件回调 */
    changeList(item) {
      this.marginBottom = 0;
      this.marginTop = 0;
      // this.$set(item, 'isExpand', !item.isExpand);
      item.isExpand = !item.isExpand;
      // 若当前节点选中,则展开时清空子节点选中
      this.setTreeDataFlat();
      this.marginTop = this.startIndex * this.lineHeight;
      this.marginBottom = this.allHeight - (this.displayList.length + this.startIndex) * this.lineHeight;
    },
    /** 选中一项 */
    selectChange(item) {
      if (!this.parentSelectable) {
        if (item[this.assignedFields.children]) return;
      }
      if (!this.multiple) {
        // single
        this.clearSelected();
        // this.$set(item, 'isCurrent', true);
        item.isCurrent = true;
        this.selectedItems = [item];
      } else {
        if (!item.isCurrent) {
          this.selectedItems.push(item);
        } else {
          let i = this.selectedItems.findIndex(it => it === item);
          this.selectedItems.splice(i, 1); //  删除选中
        }
        // vue3
        item.isCurrent = !item.isCurrent; // vue2 // this.$set(item, 'isCurrent', !item.isCurrent);
      }
      this.$emit('select', item, this.selectedItems);
    },
    /** 双击一项 */
    onDblClick(item) {
      if (item.children?.length) {
        // 展开父节点
        this.changeList(item);
      } else {
        // 选中子节点
        this.clearSelected(); // 取消选中
        item.isCurrent = true; // this.$set(item, 'isCurrent', true);
      }
      if (!this.parentSelectable) {
        if (item[this.assignedFields.children]) return;
      }
      this.$emit('dblClick', item);
    },
    /** 根据滚动条位置，设置展示的区间 */
    setIndex(e) {
      const top = e.target.scrollTop;
      this.startIndex = Math.floor(top / this.lineHeight);
      this.endIndex = this.startIndex + this.pageSize;
      const offset = top % this.lineHeight; // 半行偏移量
      this.marginTop = top - offset;
      if (this.endIndex >= this.treeDataFlat.length - 1) {
        this.marginBottom = 0;
      } else {
        this.marginBottom = this.allHeight - this.displayList.length * this.lineHeight - top;
      }
      this.setTreeDataFlat();
    },
    /** 清除选中项 */
    clearSelected() {
      for (const item of this.treeDataFlat) {
        if (item.isCurrent) {
          item.isCurrent = false; // this.$set(item, 'isCurrent', false);
        }
      }
    },
    /** 清除子节点选中 */
    clearChildrenSelected(item) {
      (function recursion(list) {
        if (!list?.length) return;
        list.forEach(it => {
          it.isCurrent = false;
          recursion(it[this.assignedFields.children]);
        });
      })(item[this.assignedFields.children]);
    },
    onContextMenu(e, item) {
      this.$emit('rightClick', { event: e, item });
    },
  },
};
</script>

<style scoped lang="less">
.vtScroll-tree {
  user-select: none;
  width: 100%;
  height: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  overflow: overlay;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(200, 200, 208, 0.7);
    border-radius: 5px;
    &:hover {
      background: rgba(200, 200, 208, 1);
    }
  }
  ul {
    height: 100%;
    padding: 0;
    flex: 1;
    // width: max-content;
    width: 100%;

    li {
      list-style-type: none;
      .list-item {
        // width: 100%;
        display: flex;
        padding-right: 10px;
        // height: var(--lineHeight);
        cursor: pointer;
        align-items: center;
        &.isSelected {
          padding-left: 4px;
          font-weight: bold;
          color: #fff;
          background-color: #1b63d9;
        }
        &:hover:not(.isSelected) {
          background-color: #fff;
        }
        .list-item-expand {
          height: 20px;
          width: 20px;
          margin-right: 5px;
          &:hover {
            opacity: 0.5;
          }
          .list-item-arrow {
            transform: translate(10px, 3px);
            transform-origin: left center;
            border-left: 5px solid #000;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-right: 5px solid transparent;
            transition: transform 0.2s ease;
            &.list-item-arrow-active {
              transform: translate(10px, 3px) rotate(90deg);
            }
          }
        }
        .list-item-title {
          white-space: nowrap;
        }
      }
    }
  }
  .vtScroll-empty {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
