<script setup lang="ts">
import { ref } from 'vue';

const num = ref<number>(0);
function handleClick() {
  num.value++;
}
const enum Type {
  a,
  b,
}
type Option = {
  id: number;
  name: string;
  type: Type;
};
function f(option: Option) {}
</script>
<template>
  <div>
    SFC ts Test
    <button @click="handleClick">num:{{ num }}</button>
  </div>
</template>
