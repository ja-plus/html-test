<template>
  <div>child</div>
</template>

<script>
export default {
    props:{
        data:Object
    },
    watch:{
        data(){
            console.log('hahaha');
        }
    }
}
</script>

<style>

</style>