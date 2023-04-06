<script lang="ts">
  import FileInput from './lib/FileInput.svelte';
  import { BeEmpty } from '@brewer/beerui';
  import { tick } from 'svelte';
  type FileInputItem = {
    id: number;
    comp: any;
  };
  let fileInputs: FileInputItem[] = [
    { id: 0, comp: null },
    // { id: 1, comp: null },
    // { id: 2, comp: null },
    // { id: 3, comp: null },
    // { id: 4, comp: null },
    // { id: 5, comp: null },
    // { id: 6, comp: null },
    // { id: 7, comp: null },
    // { id: 8, comp: null },
  ];
  let resultText = '';
  /**当前选中的input*/
  let currentInputId: number | null = null;
  function handleFileFinished(result, item) {
    // console.log('finished!!!', result.detail);
    if (currentInputId === item.id) {
      resultText = result.detail.text;
    }
  }
  function handleInputClick(result, item) {
    currentInputId = item.id;
    resultText = result.detail.text;
  }
  function handleFileChange(res, item) {
    const files: FileList = res.detail;
    const comp = item.comp;

    if (files.length >= 1) {
      comp.transferFile(files[0]);
      // 新增input
      for (let i = 1; i < files.length; i++) {
        const file = files.item(i);
        const fileInputItem = newFileInputItem();
        tick().then(() => {
          fileInputItem.comp.transferFile(file);
        });
      }
      newFileInputItem();
    }
  }
  /**新建file input*/
  function newFileInputItem() {
    const item = {
      id: fileInputs.length,
      comp: null,
    };
    fileInputs.push(item);
    fileInputs = [...fileInputs];
    return item;
  }
</script>

<main>
  <div class="main-content">
    <div class="input-file-content">
      {#each fileInputs as item (item.id)}
        <FileInput
          bind:this={item.comp}
          isActive={item.id === currentInputId}
          on:fileChange={res => handleFileChange(res, item)}
          on:finished={res => handleFileFinished(res, item)}
          on:click={res => handleInputClick(res, item)}
        />
      {/each}
    </div>
    <div class="text-content">
      {#if !resultText}
        <div class="empty">
          <BeEmpty />
        </div>
      {:else}
        <pre contenteditable="true">{resultText}</pre>
      {/if}
    </div>
  </div>
</main>

<style lang="less">
  main {
    height: 100%;
    display: flex;
    padding: var(--gap);
    .main-content {
      flex: 1;
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 300px 1fr;
      border: var(--border);
      border-radius: var(--border-radius);

      .input-file-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: var(--gap);
        padding: var(--gap);
        overflow: auto;
      }
      .text-content {
        padding: var(--gap);
        flex: 1;
        margin: 0;
        overflow: auto;
        border-left: var(--border);
        pre {
          outline: none;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
            sans-serif;
        }
        .empty {
          height: 100%;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
</style>
