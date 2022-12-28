<template>
  <div>
    <h1>VueUse</h1>
    <p>useMouse: x:{{ x }},y:{{ y }}</p>
  </div>
</template>
<script setup>
import { useLocalStorage, useMouse } from '@vueuse/core';
useLocalStorage('myLS', { a: 1 });
const { x, y } = useMouse();
</script>
