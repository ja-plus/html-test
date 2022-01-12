<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <CompositionAPI user="props.user"/>
    <Provider :data="num" />
    <button @click="num++">+++</button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import CompositionAPI from './components/CompositionApi.vue'
import Provider from './components/Provider.vue'
export default {
  name: 'App',
  components: {
    // HelloWorld
    CompositionAPI,
    Provider
  },
  data(){
    return {
      num: 0
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
