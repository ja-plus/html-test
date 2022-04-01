<template lang="pug">
div(style="display:flex;align-items:flex-start")
  div(style="width:200px")
    div allHeight:{{$refs.vScrollTree?.allHeight}}
    div mainPageHeight:{{$refs.vScrollTree?.mainPageHeight}}
    div offsetTop:{{$refs.vScrollTree?.offsetTop}}
    div offsetBottom:{{$refs.vScrollTree?.offsetBottom}}
    div startIndex:{{$refs.vScrollTree?.startIndex}}
    div endIndex:{{$refs.vScrollTree?.endIndex}}
    div pageSize:{{$refs.vScrollTree?.pageSize}}
  div(style="width: 200px;border:1px solid #ddd;")
    VirtualScrollTree(
      ref="vScrollTree"
      height="300px"
      parent-selectable
      :default-expanded-keys="[]"
      :default-selected-keys="['0-1-1']"
      :treeData="treeData"
      @select="itemSelect"
    )
  pre {{JSON.stringify(treeData,null,2)}}
 
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
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
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
