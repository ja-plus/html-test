<script setup>
// import CompositionAPI from './components/CompositionAPI.vue'
// import Element from './components/ElementUI/index.vue'
import Antdv from './components/Antdv/index.vue'
// import VxeTable from './components/VxeTable.vue'
import Pinia from './components/Pinia/Pinia.vue'
import { ref } from 'vue'
let user = ref('user1')
// let user = 'user1'
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  user:<input type="text" v-model="user">
  <!-- <CompositionAPI :user="user"/> -->
  <!-- <Element /> -->
  <Antdv />
  <!-- <VxeTable /> -->
  <Pinia />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
