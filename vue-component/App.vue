<template lang="pug">
div 
  div(style="border:1px solid #ddd;")
    VirtualScrollTree(
      style="width: 200px;"
      height="300px"
      parent-selectable
      :default-expanded-keys="[0,'0-0']"
      :default-selected-keys="['0-1-1']"
      :treeData="treeData"
      @select="itemSelect"
    )
  div {{treeData}}
 
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
    for (let i = 0; i < 2; i++) {
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
