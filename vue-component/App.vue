<template lang="pug">
div(style="border:1px solid #ddd;")
  VirtualScrollTree(
    style="width: 200px;"
    height="300px"
    :treeData="treeData"
  )
</template>

<script>
import VirtualScrollTree from './src/VirtualScrollTree.vue';
export default {
  components: {
    VirtualScrollTree,
  },
  props: {},
  data() {
    let treeData = [];
    for (let i = 0; i < 100; i++) {
      let children = [];
      for (let j = 0; j < 100; j++) {
        children.push({ title: i + '-' + j, key: i + '-' + j });
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
