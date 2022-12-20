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
import StkTable, { tableSort } from '../src/StkTable.vue';
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
  dataSource.value = insertSort(item);
  nextTick(() => {
    stkTable.value.setHighlightDimRow([item.age]);
  });
}
/**
 * 插入排序
 * @param {object} row
 */
function insertSort(row) {
  const { dataIndex, order } = tableSortStore;
  let data = [...dataSource.value];
  if (!order) {
    data.unshift(row);
    return data;
  }
  // 二分插入
  let startIndex = 0;
  let endIndex = data.length - 1;
  while (endIndex > startIndex) {
    // console.log(startIndex, endIndex);
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const midVal = data[midIndex][dataIndex];
    const targetVal = row[dataIndex];
    if (order === 'asc') {
      if (midVal > targetVal) {
        endIndex = midIndex - 1;
      } else {
        startIndex = midIndex + 1;
      }
    } else if (order === 'desc') {
      if (midVal > targetVal) {
        startIndex = midIndex + 1;
      } else {
        endIndex = midIndex - 1;
      }
    }
  }
  // console.log('startIndex', startIndex);
  if (startIndex === data.length - 1 && data[startIndex][dataIndex] !== row[dataIndex]) {
    // 与数组最后一条记录不相等，则插入在最后
    // data.splice(startIndex + 1, 0, row);
    data.push(row);
  } else {
    data.splice(startIndex, 0, row); // insert a new row
  }
  return data;
}
</script>
