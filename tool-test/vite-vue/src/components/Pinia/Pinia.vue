<script setup>
  import useStore from './store.js'
  const store = useStore()
</script>

<template>
  <details>
    <summary>Pinia</summary>
    count: <input type="text" v-model="store.count">
    
  </details>
</template>