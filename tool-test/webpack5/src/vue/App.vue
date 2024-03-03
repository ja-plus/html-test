<script setup>
import { ref } from 'vue';
import StkTable from './StkTable.vue';
import {stkTableColumns,stkTableData} from '../stk-table/props.js'

const count = ref(0);

function countPlus() {
  count.value++;
}
</script>

<template>
  <div>
    <h2>Vue3 App</h2>
    <button @click="countPlus">count++ {{ count }}</button>
    <StkTable style="height:300px" :columns="stkTableColumns" :data-source="stkTableData"></StkTable>
  </div>
</template>
