<template lang="pug">
div
    VirtualTreeSelect(:value="selectedId" :treeData="treeData" @change="onSelectChange")
br
div selectedId: {{selectedId}}
</template>

<script>
import VirtualTreeSelect from '../src/VirtualTreeSelect.vue';
export default {
  components: { VirtualTreeSelect },
  props: {},
  data() {
    let treeData = [];
    for (let i = 0; i < 20; i++) {
      let children = [];
      for (let j = 0; j < 2; j++) {
        children.push({
          title: i + '-' + j,
          key: i + '-' + j,
          children: [{ title: i + '-' + j + '-' + j + 'longlonglonglong longlonglonglong', key: i + '-' + j + '-' + j }],
        });
      }
      treeData.push({ key: i, title: String(i), children });
    }
    return {
      selectedId: '0-0',
      treeData,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onSelectChange(val) {
      this.selectedId = val;
    },
  },
};
</script>

<style></style>
