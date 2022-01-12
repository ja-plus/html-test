<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import CompositionAPI from './components/CompositionAPI.vue'
import Element from './components/ElementUI/index.vue'
import Antdv from './components/Antdv/index.vue'
import VxeTable from './components/VxeTable.vue'
import { ref } from 'vue'
let user = ref('user1')
// let user = 'user1'
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  user:<input type="text" v-model="user">
  <CompositionAPI :user="user"/>
  <Element />
  <Antdv />
  <VxeTable />
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
