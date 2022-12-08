<template>
  <div>
    <p>插入表格排序</p>

    <StkTable
      ref="StkTable"
      :columns="columns"
      :data-source="dataSource"
      sort-remote
      @sort-change="handleSortChange"
    ></StkTable>
  </div>
</template>
<script setup>
import StkTable from '../src/StkTable.vue';
import { ref } from 'vue';
const columns = [
  { title: 'name', dataIndex: 'name' },
  { title: 'age', dataIndex: 'age' },
  { title: 'gender', dataIndex: 'gender' },
];
const dataSource = ref([]);
function handleSortChange(col, order, dataSource) {
  console.log(col, order, dataSource);
}
</script>
