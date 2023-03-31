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
  /**FileStatus*/
  let status: FileStatus = FileStatus.init;
  export let resultText = '';
  let inputFileName = '';
  let transformProgress = 0;

  const dispatch = createEventDispatcher();
  const transformProgressCallback = m => {
    // console.log('m', m);
    if (m.status === TesseractStatus.recognize) {
      transformProgress = Math.floor(m.progress * 100);
      if (m.progress === 1) {
        dispatch('finished');
      }
    }
  };
  async function handleFileChange(e) {
    let file: File = e.target.files[0];
    inputFileName = file.name;
    try {
      status = FileStatus.pending;
      resultText = await transferImage2Text(file, transformProgressCallback);
    } catch (err) {
      status = FileStatus.fail;
      return;
    }
    status = FileStatus.success;
    transformProgress = 0;
    console.log(`resultText(${inputFileName}):${resultText}`);
  }
  /**
   * input file click
   */
  function handleFileClick(e) {
    if (status === FileStatus.success) {
      e.preventDefault();
      console.log('resultText', resultText);
      return;
    }
  }
</script>

<label class={'file-input ' + statusClassMap[status]} style:--progress={transformProgress} for="file">
  <input id="file" type="file" on:change={handleFileChange} on:click={handleFileClick} />
  <div class="icon-wrapper">
    <div class="status-icon">
      <BeIcon name={statusIconMap[status]} style="font-size: 40px;" />
    </div>
    {#if status === FileStatus.pending}
      <div class="progress-num">{transformProgress}</div>
    {/if}
  </div>
  {#if inputFileName}
    <span class="file-name">{inputFileName}</span>
  {/if}
</label>

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
    flex: 1;
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
