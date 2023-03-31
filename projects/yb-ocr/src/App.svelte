<script lang="ts">
  import FileInput from './lib/FileInput.svelte';
</script>

<main>
  <div class="input-file-content">
    <FileInput />
  </div>
  <pre class="text-content">TODO:</pre>
</main>

<style lang="less">
  main {
    display: flex;
    height: 100%;
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 300px 1fr;
    gap: var(--gap);
    padding: var(--gap);

    .input-file-content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }
    .text-content {
      flex: 1;
      border: 2px solid #aaa;
      border-radius: var(--border-radius);
      margin: 0;
    }
  }
</style>
