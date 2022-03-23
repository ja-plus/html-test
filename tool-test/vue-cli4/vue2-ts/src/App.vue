<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <VuexTest />
    <!-- <Antdv /> -->
    <!-- <VxeTable /> -->
  </div>
</template>

<script lang="ts">
import VuexTest from '@/components/Vuex/index.vue'
import Antdv from '@/components/Antdv/index.vue'
import VxeTable from '@/components/VxeTable/index.vue'
// import HelloWorld from './components/HelloWorld.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    // HelloWorld,
    VuexTest,
    Antdv,
    VxeTable
  },
})
export default class App extends Vue {
  beforeCreated():void{
    console.log('beforeCreated');
  }
  created():void{
    console.log('created');
  }
  mounted():void{
    console.log('mounted')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
