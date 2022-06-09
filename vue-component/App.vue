<template lang="pug">
VirtualTree
VirtualTreeSelectTest
EasyTableTest
 
</template>

<script>
import VirtualTree from './test/VirtualTree.vue';
import EasyTableTest from './test/EasyTable.vue';
import VirtualTreeSelectTest from './test/VirtualTreeSelect.vue';
export default {
  components: {
    VirtualTree,
    EasyTableTest,
    VirtualTreeSelectTest,
  },
};
</script>

<style>
body {
  height: 100vh;
  /* margin: 0; */
  box-sizing: border-box;
  /* padding: 10px; */
  display: flex;
  /* flex-direction: column; */
  /* align-items: center; */
  /* justify-content: center; */
}
</style>
