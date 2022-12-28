<template>
  <div>
    <h1>Hello vue 2.7</h1>
    <div>name: {{ name }}</div>
    <button @click="add">num:{{ num }}</button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const name: string = 'Tom';
let num = ref(0);
function add() {
  num.value++;
}
</script>
