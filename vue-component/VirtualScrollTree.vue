<template>
  <div ref="container" class="bond-list">
    <ul v-if="scrollList.length" :style="style">
      <li v-for="item in scrollList" :key="item[replaceField.key]">
        <div
          class="list-item"
          :class="{ isSelected: item.isCurrent }"
          :style="{ paddingLeft: 20 * item.level + 'px', fontWeight: item.isParent ? 'bold' : 'normal' }"
          @click="selectChange(item)"
          @dblclick="onDbClick(item)"
          @contextmenu="e => onContextMenu(e, item)"
        >
          <div v-if="item.isParent" class="list-item-arrow-wrapper" @click.stop="changeList(item)">
            <div class="list-item-arrow" :class="{ 'list-item-arrow-active': item.isExpand }"></div>
          </div>
          <span class="name" :style="{ marginLeft: !item.isParent ? '10px' : 0 }" :title="item[replaceField.title]">
            {{ item[replaceField.title] }}
          </span>
        </div>
      </li>
    </ul>
    <div v-else class="vScroll-nodata">暂无数据</div>
  </div>
</template>

<script>
const _lineHeight = 30;
const _defaultFields = {
  key: 'key',
  title: 'title',
  children: 'children',
};
export default {
  name: 'BondList',
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    parentSelectable: {
      type: Boolean,
      default: false,
    },
    treeData: {
      type: Array,
      default: () => [],
    },
    defaultExpandedKeys: {
      type: Array,
      default: () => [],
    },
    defaultSelectedKeys: {
      type: Array,
      default: () => [],
    },
    replaceFields: {
      type: Object,
      default: () => _defaultFields,
    },
  },
  data() {
    return {
      displayList: [],
      selectedItems: [], // 多选选中
      // v scroll
      startIndex: 0,
      endIndex: 30,
      marginTop: 0,
      marginBottom: 0,
      allHeight: 0,
      pageSize: 30,
    };
  },
  computed: {
    replaceField() {
      return Object.assign({}, _defaultFields, this.replaceFields);
    },
    style() {
      return {
        marginTop: this.marginTop + 'px',
        marginBottom: this.marginBottom + 'px',
      };
    },
    scrollList() {
      return this.displayList.slice(this.startIndex, this.endIndex);
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

    this.$refs.container.addEventListener('scroll', this.setIndex);
    window.addEventListener('resize', () => {
      this.$nextTick(this.init);
    });
    this.init();
  },
  methods: {
    init() {
      const containerHeight = this.$refs.container.offsetHeight;
      this.pageSize = Math.ceil(containerHeight / _lineHeight);
      this.startIndex = 0;
      this.endIndex = this.pageSize;
    },
    // 列表总数据改变，重置已选，重置虚拟滚动
    reset() {
      this.selectedItems = [];
      this.setDisplayList('reset');
      this.setDefaultSelect(); // 设置默认选中状态
      this.marginTop = 0;
      this.marginBottom = this.allHeight - this.scrollList.length * _lineHeight;
    },
    setDefaultSelect() {
      this.displayList.forEach(obj => {
        this.$set(obj, 'isCurrent', this.defaultSelectedKeys.includes(obj[this.replaceField.key]));
      });
    },
    // 设置当前展开数组
    setDisplayList(type) {
      let displayList = [];
      const that = this;
      // level 树层级
      (function func(arr, level = 0) {
        arr.forEach(item => {
          item.isParent = Boolean(item[that.replaceField.children]?.length);
          item.level = level;
          if (!item[that.replaceField.children]) {
            item.isCurrent = false; // 取消选中叶子节点
          }
          displayList.push(item);
          if (type === 'reset') {
            item.isExpand = that.defaultExpandedKeys.includes(item[that.replaceField.key]);
          }
          if (item.isExpand) {
            func(item[that.replaceField.children] || [], level + 1);
          }
        });
      })(this.TreeData);
      this.allHeight = displayList.length * _lineHeight;
      this.displayList = displayList;
    },
    /** 展开收起事件回调 */
    selectChange(item) {
      if (!this.parentSelectable) {
        if (item[this.replaceField.children]) return;
      }
      if (!this.multiple) {
        // single
        this.clearSelected();
        this.$set(item, 'isCurrent', true);
        this.selectedItems = [item];
      } else {
        if (!item.isCurrent) {
          this.selectedItems.push(item);
        } else {
          let i = this.selectedItems.findIndex(it => it === item);
          this.selectedItems.splice(i, 1); //  删除选中
        }
        this.$set(item, 'isCurrent', !item.isCurrent);
      }
      this.$emit('select', item, this.selectedItems);
    },
    /** 双击一项 */
    onDbClick(item) {
      if (item.children?.length) {
        // 展开父节点
        this.changeList(item);
      } else {
        // 选中子节点
        this.clearSelected(); // 取消选中
        this.$set(item, 'isCurrent', true);
      }
      if (!this.parentSelectable) {
        if (item[this.replaceField.children]) return;
      }
      this.$emit('dblClick', item);
    },
    setIndex(e) {
      const top = e.target.scrollTop;
      this.startIndex = Math.floor(top / _lineHeight);
      const offset = top % _lineHeight;
      this.endIndex = this.startIndex + this.pageSize + 1;
      this.marginTop = top - offset;
      if (this.endIndex >= this.displayList.length - 1) {
        this.marginBottom = 0;
      } else {
        this.marginBottom = this.allHeight - this.scrollList.length * _lineHeight - top;
      }
      this.setDisplayList();
    },
    /** 清除选中项 */
    clearSelected() {
      for (const item of this.displayList) {
        if (item.isCurrent) {
          this.$set(item, 'isCurrent', false);
        }
      }
    },
    onContextMenu(e, item) {
      this.$emit('rightClick', { event: e, item });
    },
  },
};
</script>

<style scoped lang="less">
.bond-list {
  --lieHeight: 30px;
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
    flex: 1;
    width: max-content;
    min-width: 100%;

    li {
      list-style-type: none;
      .list-item {
        width: 100%;
        display: flex;
        padding-right: 10px;
        height: var(--lineHeight);
        line-height: var(--lineHeight);
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
        .list-item-arrow-wrapper {
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
            &.list-item-arrow-active {
              transform: translate(10px, 3px) rotate(90deg);
            }
          }
        }
        .name {
          white-space: nowrap;
        }
      }
    }
    .vScroll-nodata {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
