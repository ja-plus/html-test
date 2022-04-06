<template>
  <div id="vScrollTree" class="vtScroll-tree" :style="{ height: height }">
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
            'item-parent': item.isParent,
            'item-current': item[assignedFields.key] === currentItem[assignedFields.key],
            'item-highlight': highlightCurrent && item[assignedFields.key] === currentItem[assignedFields.key],
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
          <!-- 多选框 -->
          <div v-if="showCheckbox">
            <input :checked="selectedItems.includes(item)" type="checkbox" @click="onCheckboxClick" @change="onCheckboxChange($event, item)" />
          </div>
          <!-- 文字 -->
          <div class="list-item-title" :title="item[assignedFields.title]">
            <span>{{ item[assignedFields.title] }}</span>
            <!-- TODO:slot? -->
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="vtScroll-empty">{{ emptyText }}</div>
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
    /** 高亮选中行 */
    highlightCurrent: {
      type: Boolean,
      default: true,
    },
    /** 当前行是否可取消 */
    currentCancelable: {
      type: Boolean,
      default: false,
    },
    /** 父节点是否可点击为current */
    parentClickable: {
      type: Boolean,
      default: false,
    },
    /** 无数据时显示的内容 */
    emptyText: {
      type: String,
      default: '暂无数据',
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
    /** 默认展开所有节点 */
    defaultExpandAll: {
      type: Boolean,
      default: false,
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
      this.rootEl = document.getElementById('vScrollTree');
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
      // level 树层级
      (function func(arr, level = 0, parent = null) {
        arr.forEach(item => {
          item.isParent = Boolean(item[this.assignedFields.children]);
          item.level = level;
          item.parent = parent;
          treeDataFlat.push(item);
          if (type === 'init') {
            if (this.defaultExpandAll) {
              item.isExpand = true;
            } else {
              item.isExpand = this.defaultExpandedKeys.includes(item[this.assignedFields.key]);
            }
          }
          if (item.isExpand) {
            func.bind(this)(item[this.assignedFields.children] || [], level + 1, item);
          }
        });
      }.bind(this)(this.treeData));

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
    },
    /** 点击一项 */
    handleItemClick(item) {
      if (!this.parentClickable) {
        // 父节点不可点击
        if (item[this.assignedFields.children]) return;
      }
      if (this.currentCancelable) {
        this.currentItem = this.currentItem === item ? {} : item;
      } else {
        this.currentItem = item;
      }
      this.$emit('itemClick', item);
      // this.setSelectedItem(item);
    },
    /** 设置选中项 */
    setSelectedItem(item, checked) {
      if (this.multiple) {
        // multiple
        if (checked) {
          this.selectedItems.push(item);
        } else {
          const i = this.selectedItems.indexOf(item);
          if (i === -1) {
            this.selectedItems.splice(i, 1); // FIXME: 数据量大有性能问题？
          }
        }
      } else {
        // single
        this.selectedItems = checked ? [item] : [];
      }
      this.$emit('itemSelect', {
        checked,
        item,
        selectedItems: this.selectedItems,
      });
    },
    /** 双击一项 */
    onDblClick(item) {
      // this.currentItem = item;
      // if (item[this.assignedFields.children]) {
      //   // 展开父节点
      //   this.changeList(item);
      // } else {
      //   // 选中节点
      //   // this.setSelectedItem(item);
      //   // item.isCurrent = true; // this.$set(item, 'isCurrent', true);
      // }
      // if (!this.parentClickable) {
      //   if (item[this.assignedFields.children]) return;
      // }
      // this.$emit('dblClick', item);
    },
    onContextMenu(e, item) {
      this.$emit('rightClick', { event: e, item });
    },
    onCheckboxChange(e, item) {
      this.setSelectedItem(item, e.target.checked);
    },
    onCheckboxClick(e) {
      // e.stopPropagation();
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
        }
        &.item-highlight {
          color: #fff;
          background-color: #1b63d9;
        }
        &:hover:not(.item-highlight) {
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
