<template>
  <div>
    <p>插入表格排序</p>
    <button @click="addRow">add row</button>

    <StkTable
      ref="stkTable"
      row-key="age"
      :columns="columns"
      :data-source="dataSource"
      sort-remote
      @sort-change="handleSortChange"
    ></StkTable>
  </div>
</template>
<script setup>
import StkTable, { insertToOrderedArray, tableSort } from '../src/StkTable.vue';
import { nextTick, ref } from 'vue';

const stkTable = ref();

const columns = [
  { title: 'name', dataIndex: 'name' },
  { title: 'age', dataIndex: 'age', sorter: true, sortType: 'number' },
  { title: 'gender', dataIndex: 'gender' },
];
const dataSource = ref(
  new Array(5).fill(null).map((it, i) => {
    return {
      name: 'name' + i,
      age: i,
      gender: i + 1,
    };
  }),
);
const tableSortStore = {
  dataIndex: '',
  order: '',
};
function handleSortChange(col, order, data) {
  // console.log(col, order, data);
  dataSource.value = tableSort(col, order, data);
  tableSortStore.dataIndex = col.dataIndex;
  tableSortStore.order = order;
}
function addRow() {
  const random = Math.random() * 10;
  const item = {
    name: 'name' + random,
    age: random,
    gender: random,
  };
  // dataSource.value.push(item);
  // dataSource.value = [...dataSource.value];
  dataSource.value = insertToOrderedArray(tableSortStore, item, dataSource.value);
  nextTick(() => {
    stkTable.value.setHighlightDimRow([item.age]);
  });
}
</script>
