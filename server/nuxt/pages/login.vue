<template>
  <div class="outer">
    <div class="inner">
      <h2 class="header">Login</h2>
      <div class="row username">
        <span class="title">username: </span>
        <input type="text">
      </div>
      <div class="row password">
        <span class="title">passowrd:</span>
        <input type="password" name="" id="">
      </div>
      <div class="row">
        <button>login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
body{
  margin: 0;
}
* {
  box-sizing: border-box;
}
  .outer{
    background: #eee;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .inner{
    border-radius: 5px;
    box-shadow: 0 0 5px 0 #aaa;
    background-color: #fff;
    padding: 20px 10px;
  }
</style>