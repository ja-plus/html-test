<template>
  <div>
    <h1>CompositionAPI {{user}}</h1>
    <button @click="addCount">counter:{{counter}}</button>
    <div>
      {{userComputed}}
      </div>
      <div>counter2:{{counter2}}</div>
      <div>refObj: {{refObj}}</div>
      <div>reactiveObj: {{reactiveObj}}</div>
  </div>
</template>

<script>
import { ref,onMounted,watch,toRefs,computed, reactive } from '@vue/composition-api';
// import CompositionPart from './CompositionPart.js'
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
    // let {counter,counter2} = CompositionPart(props)
    let counter = ref(0)
    let counter2 = computed(() => counter.value*2)
    onMounted(() => {
      console.log('onMounted');
    })
    
    watch(prop.user,(n,o) => {
      console.log('props.user change:',n, o);
      // counter.value++
    })
    // ref reactive区别是什么？
    const refObj = ref({
      name: 'nnn',
      age: 1
    })
    const reactiveObj=  reactive({
      name: 'reactivename',
      age: 0,
    })


    function addCount(){
      counter.value++
      // 更新方式不一样？
      refObj.value.age++
      reactiveObj.age++
    }
    return {
      counter,
      counter2,
      refObj,
      reactiveObj,
      userComputed,
      addCount
    }
  },
  methods:{
   
  }
}
</script>

<style>

</style>