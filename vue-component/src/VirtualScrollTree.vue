<template>
  <div ref="container" class="vtScroll-tree" :style="{ height: height }">
    <ul
      v-if="displayList.length"
      :style="{
        height: lineHeight * pageSize + 'px',
        paddingTop: offsetTop + 'px',
        paddingBottom: offsetBottom + 'px',
      }"
    >
      <li v-for="item in displayList" :key="item[assignedFields.key]">
        <!-- 20: arrow width -->
        <div
          class="list-item"
          :class="{
            'item-current': item[assignedFields.key] === currentItem[assignedFields.key],
            'item-parent': item.isParent,
          }"
          :style="{
            height: lineHeight + 'px',
            paddingLeft: item.isParent ? indentWidth * item.level + 'px' : indentWidth * (item.level - 1) + 20 + 'px',
          }"
          @click="handleItemClick(item)"
          @dblclick="onDblClick(item)"
          @contextmenu="e => onContextMenu(e, item)"
        >
          <!-- 展开箭头 -->
          <div v-if="item.isParent" class="list-item-expand" @click.stop="changeList(item)">
            <div class="list-item-arrow" :class="{ 'list-item-arrow-active': item.isExpand }"></div>
            <!-- TODO: slot 箭头样式 -->
          </div>
          <!-- 多选框 TODO: item.isChecked -->
          <div v-if="showCheckbox">
            <input :checked="selectedItems.includes(item)" type="checkbox" @change="onCheckboxChange" />
          </div>
          <!-- 文字 -->
          <div class="list-item-title" :title="item[assignedFields.title]">
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
    /** 展示checkbox */
    showCheckbox: {
      type: Boolean,
      default: false,
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
    /** 默认展开的键数组 (区分Number、String类型) */
    defaultExpandedKeys: {
      type: Array,
      default: () => [],
    },
    /** 默认选中的项数组 (父元素必须默认展开) */
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
      // var
      currentItem: {}, // 点击后高亮的行
      // v scroll
      startIndex: 0,
      endIndex: 30,
      offsetTop: 0,
      offsetBottom: 0,
      pageSize: 30,
    };
  },
  computed: {
    /** 合并传入的fields */
    assignedFields() {
      return Object.assign({}, _defaultFields, this.replaceFields);
    },
    /** 实际显示的列表*/
    displayList() {
      return this.treeDataFlat.slice(this.startIndex, this.endIndex);
    },
    /** 总高度 */
    allHeight() {
      return this.treeDataFlat.length * this.lineHeight;
    },
    /** 活动页面高度 */
    mainPageHeight() {
      return this.pageSize * this.lineHeight;
    },
  },
  watch: {
    treeData() {
      // 列表发生改变，重置已选，重置虚拟滚动
      this.init();
    },
  },
  mounted() {
    this.init();
    // event listener
    this.rootEl.addEventListener('scroll', this.setIndex);
    // window.addEventListener('resize', () => {
    //   this.$nextTick(this.init);
    // });
  },
  methods: {
    init() {
      this.rootEl = document.querySelector('.vtScroll-tree');
      const containerHeight = this.rootEl.offsetHeight;
      this.pageSize = Math.floor(containerHeight / this.lineHeight + 1);
      this.startIndex = 0;
      this.endIndex = this.pageSize;
      this.offsetTop = 0;
      this.setTreeDataFlat('init'); // 展开树，获得总高度 allHeight
      this.offsetBottom = this.allHeight - this.mainPageHeight;

      this.selectedItems = [];
      this.setDefaultSelect(); // 设置默认选中状态
    },
    setDefaultSelect() {},
    /**
     * 设置当前展开数组
     * @param {String} type 'init'
     */
    setTreeDataFlat(type) {
      const treeDataFlat = [];
      const that = this;
      // level 树层级
      (function func(arr, level = 0) {
        arr.forEach(item => {
          item.isParent = Boolean(item[that.assignedFields.children]);
          item.level = level;
          treeDataFlat.push(item);
          if (type === 'init') {
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
      this.offsetBottom = 0;
      this.offsetTop = 0;
      // this.$set(item, 'isExpand', !item.isExpand);
      item.isExpand = !item.isExpand;
      // 若当前节点选中,则展开时清空子节点选中
      this.setTreeDataFlat();
      this.offsetTop = this.startIndex * this.lineHeight;
      this.offsetBottom = this.allHeight - (this.displayList.length + this.startIndex) * this.lineHeight;
    },
    /** 根据滚动条位置，设置展示的区间 */
    setIndex(e) {
      const top = e.target.scrollTop;
      this.startIndex = Math.floor(top / this.lineHeight);
      const offset = top % this.lineHeight; // 半行偏移量
      this.offsetTop = top - offset;
      this.endIndex = this.startIndex + this.pageSize;

      this.offsetBottom = this.allHeight - this.mainPageHeight - this.offsetTop;
      // this.setTreeDataFlat();
    },
    /** 点击一项 */
    handleItemClick(item) {
      if (!this.parentSelectable) {
        if (item[this.assignedFields.children]) return;
      }
      this.currentItem = item;
      if (!this.multiple) {
        // single
        this.selectedItems = this.selectedItems[0] === item ? [] : [item];
      } else {
        // multiple
        if (!this.selectedItems.includes(item)) {
          this.selectedItems.push(item);
        }
      }
      this.$emit('itemClick', item, this.selectedItems);
    },
    /** 双击一项 */
    onDblClick(item) {
      if (item.children?.length) {
        // 展开父节点
        this.changeList(item);
      } else {
        // 选中子节点
        // item.isCurrent = true; // this.$set(item, 'isCurrent', true);
      }
      if (!this.parentSelectable) {
        if (item[this.assignedFields.children]) return;
      }
      this.$emit('dblClick', item);
    },
    // /** 清除子节点选中 */
    // clearChildrenSelected(item) {
    //   (function recursion(list) {
    //     if (!list?.length) return;
    //     list.forEach(it => {
    //       it.isCurrent = false;
    //       recursion(it[this.assignedFields.children]);
    //     });
    //   })(item[this.assignedFields.children]);
    // },
    onContextMenu(e, item) {
      this.$emit('rightClick', { event: e, item });
    },
    onCheckboxChange(e) {
      console.log(e.target.checked);
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
    margin: 0;
    flex: 1;
    // width: max-content;
    width: 100%;

    li {
      list-style-type: none;
      .list-item {
        color: #000;
        // width: 100%;
        display: flex;
        padding-right: 10px;
        cursor: pointer;
        align-items: center;
        &.item-current {
          padding-left: 4px;
          font-weight: bold;
          color: #fff;
          background-color: #1b63d9;
        }
        &:hover:not(.item-current) {
          background-color: #eee;
        }
        // 父节点
        &.item-parent {
          font-weight: bold;
        }
        .list-item-expand {
          height: 20px;
          width: 20px;
          &:hover {
            opacity: 0.5;
          }
          .list-item-arrow {
            transform: translate(10px, 6px);
            transform-origin: left center;
            border-left: 5px solid; // color 继承自祖先元素
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
          margin-left: 5px;
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
