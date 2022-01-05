<template>
  <h1>CompositionAPI {{user}}</h1>
  <button @click="addCount">counter:{{counter}}</button>
  <div>
    {{userComputed}}
    </div>
    <div>counter2:{{counter2}}</div>
</template>

<script>
import { ref,onMounted,watch,toRefs,computed } from 'vue';
import CompositionPart from './CompositionPart.js'
export default {
  props: {
    user: {
      type:String,
      required: true
    }
  },
  setup(props){
    console.log(props);
    let prop = toRefs(props)
    let userComputed = computed(() => props.user + 'com')
    let {counter,counter2} = CompositionPart(props)
    onMounted(() => {
      console.log('onMounted');
    })
    
    watch(prop.user,(n,o) => {
      console.log('props.user change:',n, o);
      counter.value++
    })
    
    return {
      counter,
      counter2,
      userComputed,
      repositories: [1,2,3]
    }
  },
  methods:{
    addCount(){
      this.counter++
    }
  }
}
</script>

<style>

</style>