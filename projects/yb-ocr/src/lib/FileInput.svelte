<script lang="ts">
  import { BeIcon } from '@brewer/beerui';
  import { createEventDispatcher } from 'svelte';
  import { FileStatus, TesseractStatus } from '../types/enums';
  import { transferImage2Text } from '../utils';
  const statusIconMap = {
    [FileStatus.init]: 'add',
    [FileStatus.fail]: 'error-circle',
    [FileStatus.pending]: 'loading',
    [FileStatus.success]: 'check-circle',
  };
  const statusClassMap = {
    [FileStatus.init]: 'init',
    [FileStatus.fail]: 'fail',
    [FileStatus.pending]: 'pending',
    [FileStatus.success]: 'success',
  };
  // export let id = null;
  export let isActive = false;
  let fileEl = null;
  let result = {
    status: FileStatus.init,
    text: '',
    inputFileName: '',
  };
  let transformProgress = 0;

  const dispatch = createEventDispatcher<{
    /**转换成功的回调*/
    finished: typeof result;
    click: typeof result;
  }>();

  const transformProgressCallback = m => {
    // console.log('m', m);
    if (m.status === TesseractStatus.recognize) {
      transformProgress = Math.floor(m.progress * 100);
    }
  };
  async function handleFileChange(e) {
    let file: File = e.target.files[0];
    result.inputFileName = file.name;
    try {
      result.status = FileStatus.pending;
      result.text = await transferImage2Text(file, transformProgressCallback);
      dispatch('finished', { ...result });
    } catch (err) {
      result.status = FileStatus.fail;
      return;
    }
    result.status = FileStatus.success;
    transformProgress = 0;
    // console.log(`resultText(${result.inputFileName}):${result.text}`);
  }
  function handleFileClick() {
    if (result.status !== FileStatus.success) {
      fileEl.click();
    }
    dispatch('click', { ...result });
  }
</script>

<div
  class={'file-input ' + statusClassMap[result.status]}
  class:active={isActive}
  style:--progress={transformProgress}
  on:keypress
  on:click={handleFileClick}
>
  <input bind:this={fileEl} type="file" on:change={handleFileChange} />
  <div class="icon-wrapper">
    <div class="status-icon">
      <BeIcon name={statusIconMap[result.status]} style="font-size: 40px;" />
    </div>
    {#if result.status === FileStatus.pending}
      <div class="progress-num">{transformProgress}</div>
    {/if}
  </div>
  {#if result.inputFileName}
    <span class="file-name">{result.inputFileName}</span>
  {/if}
</div>

<style lang="less">
  @property --progress {
    syntax: '<number>';
    inherits: false;
    initial-value: 0;
  }
  .file-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100px;
    cursor: pointer;
    border: 2px dashed;
    border-radius: var(--border-radius);
    color: #888;
    background: linear-gradient(
      90deg,
      rgba(172, 224, 249, 0.2),
      rgba(172, 224, 249, 1) calc(var(--progress) * 1%),
      transparent calc(var(--progress) * 1%)
    );
    transition: --progress 0.5s ease-out;
    > input[type='file'] {
      display: none;
    }
    &.active {
      border-style: solid;
    }

    &.fail {
      color: var(--color-error);
    }
    &.pending {
      color: var(--color-pending);
      pointer-events: none;
      .status-icon {
        animation: loading 2s ease infinite;
      }
    }
    &.success {
      color: var(--color-success);
    }
    &:hover {
      // filter: drop-shadow(0 0 2px);
      box-shadow: 0px 0px 5px;
    }

    .file-name {
      margin-top: var(--gap);
    }
    .icon-wrapper {
      position: relative;
      .status-icon {
        display: flex;
      }
      .progress-num {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>
