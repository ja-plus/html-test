<template lang='pug'>
  div
    h1.title hello vue
    span {{student.name}}
</template>

<script lang='ts'>
enum Gender{
  man,
  woman
}
interface Person{
  name:string;
  age:number;
  gender: Gender
}
let student:Person = {
  name: 'Tom',
  age: 12,
  gender: Gender.man
}
export default {
  props:{},
  data(){
    return {
      student
    }
  },
  computed:{},
  created(){},
  mounted(){},
  methods: {

  },
}
</script>

<style>
.title{
  color:blueviolet;
}
</style>