<template lang="pug">
div(style="display:flex;justify-content:center;width:100vw;")
    VirtualTreeSelect(
        :replaceFields="{key:'id', title:'label'}" 
        :value="selectedId" 
        :treeData="treeData"
        :vsTreeProps="{lineHeight:20}" 
        @change="onSelectChange"
        )
    VirtualTreeSelect(:replaceFields="{key:'id', title:'label'}" disabled :value="selectedId" :treeData="treeData" @change="onSelectChange")
    VirtualTreeSelect(
        :replaceFields="{key:'id', title:'label'}" 
        placeholder="请选择..."
        :treeData="treeData"
        :vsTreeProps="{lineHeight:20}" 
        :dropdownWidth="1000"
        @change="onSelectChange"
    )
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
          label: i + '-' + j,
          id: i + '-' + j,
          children: [{ label: i + '-' + j + '-' + j + 'longlonglonglong longlonglonglong', id: i + '-' + j + '-' + j }],
        });
      }
      treeData.push({ id: i, label: String(i), children });
    }
    return {
      selectedId: '0-0',
      treeData,
    };
  },
  methods: {
    onSelectChange(item) {
      this.selectedId = item.id;
    },
  },
};
</script>

<style></style>
