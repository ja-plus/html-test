<template lang="pug">
div(style="display:flex;align-items:flex-start")
  div(style="width:200px")
    div allHeight:{{vScrollTree.allHeight}}
    div mainPageHeight:{{vScrollTree.mainPageHeight}}
    div offsetTop:{{vScrollTree.offsetTop}}
    div offsetBottom:{{vScrollTree.offsetBottom}}
    div startIndex:{{vScrollTree.startIndex}}
    div endIndex:{{vScrollTree.endIndex}}
    div pageSize:{{vScrollTree.pageSize}}
    hr
    div currentItem:{{vScrollTree.currentItem}}
    div selectedItems:{{vScrollTree.selectedItems}}
  div(style="width: 200px;border:1px solid #ddd;")
    VirtualScrollTree(
      ref="vScrollTree"
      v-bind="vScrollTreeProps"
      :treeData="treeData"
      @itemClick="itemClick"
      @itemSelect="itemSelect"
      @dblClick="itemDblClick"
      @rightClick="itemRightClick"
    )
  //- pre {{JSON.stringify(treeData,null,2)}}
 
</template>

<script>
import VirtualScrollTree from '../src/VirtualScrollTree.vue';
export default {
  components: {
    VirtualScrollTree,
  },
  props: {},
  data() {
    let treeData = [];
    for (let i = 0; i < 20; i++) {
      let children = [];
      for (let j = 0; j < 2; j++) {
        children.push({ title: i + '-' + j, key: i + '-' + j, children: [{ title: i + '-' + j + '-' + j, key: i + '-' + j + '-' + j }] });
      }
      treeData.push({ key: i, title: String(i), children });
    }
    return {
      treeData,
      vScrollTree: {},
      vScrollTreeProps: {
        height: '300px',
        // lineHeight: 20,
        // multiple: true,
        // indentWidth: 10,
        // highlightCurrent: false,
        // currentCancelable: true,
        showCheckbox: true,
        parentClickable: true,
        // emptyText: 'no Data',
        // defaultExpandAll: true,
        defaultExpandedKeys: [0, '0-1'],
        defaultCurrentKey: '0-1-1',
        defaultSelectedKeys: ['0-1-1'],
      },
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.vScrollTree = this.$refs.vScrollTree;
  },
  methods: {
    itemClick(item) {
      console.log('itemClick', item);
    },
    itemSelect(option) {
      console.log('itemSelect', option);
    },
    itemDblClick(item) {
      console.log('itemDblClick', item);
    },
    itemRightClick(item) {
      console.log('itemRightClick', item);
    },
  },
};
</script>

<style>
body {
  height: 100vh;
  margin: 0;
  display: flex;
  /* flex-direction: column; */
  /* align-items: center; */
  /* justify-content: center; */
}
</style>
