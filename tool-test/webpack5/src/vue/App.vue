<script setup>
import { ref } from 'vue';

const count = ref(0);

function countPlus() {
  count.value++;
}
</script>

<template>
  <div>
    <h2>vue app</h2>
    <button @click="countPlus">count++ {{ count }}</button>
  </div>
</template>
