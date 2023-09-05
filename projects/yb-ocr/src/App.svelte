<script lang="ts">
  import Router, { push } from 'svelte-spa-router';
  import AsideNav from './Components/AsideNav.svelte';
  import { routes, routeInfo } from './routes';

  function handleNavChange(e: CustomEvent<string>) {
    push(e.detail);
  }
</script>

<main>
  <AsideNav options={routeInfo.map(it => ({ label: it.name, value: it.path }))} on:change={handleNavChange} />
  <Router {routes} />
</main>

<style lang="less">
  main {
    height: 100%;
    display: flex;
    padding: var(--gap);
  }
</style>
