<template>
  <div>inject:{{num}}</div>
</template>

<script>
export default {
  inject: ['num'],
  data(){
    return {
      num: this.num
    }
  },
  watch:{
    num() {
      console.log('asdfs');
    }
  }
}
</script>

<style>

</style>