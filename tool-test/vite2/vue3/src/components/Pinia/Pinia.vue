<script setup>
  import useStore from './store.js'
  // import useStore from './functionStore.js'
  const store = useStore()
  function addCount(){
    // store.$patch({count: store.count + 1})
    store.increment({count:3})
  }
  store.arr.push(1)
</script>

<template>
  <details open>
    <summary>Pinia</summary>
    count: <input type="text" v-model="store.count">
    <button @click="addCount">addCount:{{store.count}}</button>
    double: {{store.double}}
    arr: {{store.arr}}
  </details>
</template>