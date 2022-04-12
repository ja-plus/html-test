<template lang="pug">
//- VirtualScrollTreeTest
VirtualTreeSelectTest
//- EasyTableTest
 
</template>

<script>
import VirtualScrollTreeTest from './test/VirtualScrollTree.vue';
import EasyTableTest from './test/EasyTable.vue';
import VirtualTreeSelectTest from './test/VirtualTreeSelect.vue';
export default {
  components: {
    VirtualScrollTreeTest,
    EasyTableTest,
    VirtualTreeSelectTest,
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
