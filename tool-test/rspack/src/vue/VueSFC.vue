<script setup>
import { ref } from 'vue';

const num = ref(0);
function handleClick() {
  num.value++;
}
</script>
<template>
  <div>
    SFC Test
    <button @click="handleClick">num:{{ num }}</button>
  </div>
</template>
