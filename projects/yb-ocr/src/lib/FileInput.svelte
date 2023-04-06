<script lang="ts">
  import { BeIcon, BeCountTo } from '@brewer/beerui';
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
  let countTo;
  let countToStart = 0;
  let transformProgress = 0;

  const dispatch = createEventDispatcher<{
    fileChange: FileList;
    /**转换成功的回调*/
    finished: typeof result;
    click: typeof result;
  }>();

  const transformProgressCallback = m => {
    // console.log('m', m);
    if (m.status === TesseractStatus.recognize) {
      countToStart = transformProgress;
      transformProgress = Math.floor(m.progress * 100);
      countTo.startHandler();
    }
  };
  async function handleFileChange(e) {
    dispatch('fileChange', e.target.files);
  }
  /**导出该函数可被父组件调用*/
  export async function transferFile(file: File) {
    result.inputFileName = file.name;
    try {
      result.status = FileStatus.pending;
      result.text = await transferImage2Text(file, transformProgressCallback);
      dispatch('finished', { ...result });
    } catch (err) {
      result.status = FileStatus.fail;
      console.error(err);
      return;
    }
    result.status = FileStatus.success;
    countToStart = 0;
    transformProgress = 0;
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
  <input bind:this={fileEl} type="file" multiple on:change={handleFileChange} />
  <div class="icon-wrapper">
    <div class="status-icon">
      <BeIcon name={statusIconMap[result.status]} style="font-size: 46px;" />
    </div>
    {#if result.status === FileStatus.pending}
      <div class="progress-num">
        <BeCountTo start={countToStart} end={transformProgress} duration={1000} bind:this={countTo} />
      </div>
    {/if}
  </div>
  <span class="file-name"> {result.inputFileName || '点击添加文件'}</span>
</div>

<style lang="less">
  @property --progress {
    syntax: '<number>';
    inherits: false;
    initial-value: 0;
  }
  @keyframes loading {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
  .file-input {
    display: flex;
    align-items: center;
    height: 80px;
    flex-shrink: 0;
    padding: var(--gap);
    cursor: pointer;
    border: 2px dashed;
    border-radius: var(--border-radius);
    color: #888;
    background: linear-gradient(90deg, rgba(30, 232, 117, 0.2), rgb(30, 232, 117) calc(var(--progress) * 1%), transparent calc(var(--progress) * 1%));
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
        animation: loading 2s linear infinite;
      }
    }
    &.success {
      color: var(--color-success);
    }
    &:hover {
      // filter: drop-shadow(0 0 2px);
      box-shadow: 0px 0px 5px;
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
    .file-name {
      word-break: break-all;
      margin-left: var(--gap);
    }
  }
</style>
