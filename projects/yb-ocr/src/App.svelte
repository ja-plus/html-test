<script lang="ts">
  import FileInput from './lib/FileInput.svelte';
  const fileInputs = [{ id: 0 }, { id: 1 }];
  let resultText = '';
  /**当前选中的input*/
  let currentInputId: number | null = null;
  function handleFileFinished(result, id) {
    // console.log('finished!!!', result.detail);
    if (currentInputId === id) {
      resultText = result.detail.text;
    }
  }
  function handleInputClick(result, id) {
    currentInputId = id;
    resultText = result.detail.text;
  }
</script>

<main>
  <div class="input-file-content">
    {#each fileInputs as item (item.id)}
      <FileInput
        isActive={item.id === currentInputId}
        on:finished={res => handleFileFinished(res, item.id)}
        on:click={res => handleInputClick(res, item.id)}
      />
    {/each}
  </div>
  <pre class="text-content">{resultText}</pre>
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
      flex-direction: column;
      gap: var(--gap);
    }
    .text-content {
      flex: 1;
      border: 2px solid #aaa;
      border-radius: var(--border-radius);
      margin: 0;
      overflow: auto;
    }
  }
</style>
