<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" @click="clickImg">{{ name }}
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { state,setState } from './observableState';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  computed:{
    name(){
      return state.name;
    }
  },
  methods:{
    clickImg(){
      setState('name','Vue.observable state changed')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
