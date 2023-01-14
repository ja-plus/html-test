<template>
  <div>
    <h1>Hello vue 2.7</h1>
    <div>name: {{ name }}</div>
    <button @click="add">num:{{ num }}</button>
    <a-date-picker v-model="date"></a-date-picker>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const name: string = 'Tom';
let num = ref(0);
function add() {
  num.value++;
}

const date = ref();
</script>
