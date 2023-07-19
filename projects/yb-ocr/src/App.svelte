<script lang="ts">
  import Router, { link } from 'svelte-spa-router';
  import AsideNav from './Components/AsideNav.svelte';
  import { routes, routeInfo } from './routes';
</script>

<main>
  <AsideNav let:item options={routeInfo.map(it => ({ label: it.name, value: it.path }))}>
    <a style="display:block;color:#242424" href={'#' + item.value} use:link>{item.label}</a>
  </AsideNav>
  <Router {routes} />
</main>

<style lang="less">
  main {
    height: 100%;
    display: flex;
    padding: var(--gap);
  }
</style>
