<template>
  <div style="border: 1px solid #ddd">
    provider:{{data}}
    <Inject />
  </div>
</template>

<script>
  import Inject from './Inject.vue'
export default {
  components:{Inject},
props:{
  data: Number
},
provide() {
  return {
    num: this.data
  }
},
data(){
  return {
  }
},
computed:{},
created(){},
mounted(){},
methods: {},
}
</script>

<style>

</style>