<script lang="ts">
  import Ocr from './views/Ocr/index.svelte';
  import BackgroundRemoval from './views/BackgroundRemoval/index.svelte';
  let current = 1;
</script>

<main>
  <nav>
    <button on:click={() => (current = 1)}>1</button>
    <button on:click={() => (current = 2)}>2</button>
  </nav>
  {#if current === 1}
    <Ocr />
  {:else}
    <BackgroundRemoval />
  {/if}
</main>

<style lang="less">
  main {
    height: 100%;
    display: flex;
    padding: var(--gap);
  }
</style>
