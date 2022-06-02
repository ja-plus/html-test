<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <CompositionAPI   user="props.user"/>
    <Provider :data="num" />
    <button @click="num++">+++</button>
    <button @click="updateObj" @mouseover="updateObj">updateObj</button>
    <button @click="updateObj2" @mouseover="updateObj2">updateOBj</button>
    {{obj}}
    <!-- 点击num变更，此组件data会一直监听 -->
    <Child :data="{data:[]}"/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import CompositionAPI from './components/CompositionApi.vue'
import Provider from './components/Provider.vue'
import Child from './components/Child.vue'
export default {
  name: 'App',
  components: {
    // HelloWorld
    CompositionAPI,
    Provider,
    Child
  },
  data(){
    return {
      num: 0,
      obj:{},
    }
  },
  methods:{
    updateObj(){
      // this.$delete(this.obj, 'isHover')
      // this.obj.isHover = false
      console.log('aaa');
      this.$set(this.obj, 'isHover', false)
    },
    updateObj2(){
      console.log('bbb');
      this.$set(this.obj, 'isHover', true)
    },
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
