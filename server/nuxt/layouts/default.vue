<template>
  <div>
    <header>Nuxt</header>
    <div class="root-content">
    <nuxt/>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
header{
  position: fixed;
  top:0;
  width: 100vw;
  font-size: 24px;
  line-height: 30px;
  font-weight: bolder;
  padding: 0 10px;
  background-color: #fff;
  z-index:99;
}
.root-content{
  margin-top: 40px;
}
</style>