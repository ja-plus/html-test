<template>
  <div id="app">
    <nav>
      <router-link to="/">Vuex</router-link>
      <span> | </span>
      <router-link to="/antdv">Antdv</router-link>
      <span> | </span>
      <router-link to="/vxeTable">VxeTable</router-link>
      <span> | </span>
      <router-link to="/pinia">Pinia</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script lang="ts"></script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
