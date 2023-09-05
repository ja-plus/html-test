<script lang="ts">
  import imglyRemoveBackground from '@imgly/background-removal';
  let sourceFile: File = new File([], 'empty.jpg');

  let sourceImage = '';
  let targetImage = '';

  let loadingInterval = 0;
  let loadingTime = 0;

  let fileInput;

  async function handleFileChange(e: Event) {
    sourceFile = (e.target as any).files[0];
    URL.revokeObjectURL(sourceImage);
    sourceImage = URL.createObjectURL(sourceFile);
    showLoading();
    await removal();
    hideLoading();
  }

  async function fileInputClick() {
    fileInput.click();
  }

  function showLoading() {
    window.clearInterval(loadingInterval);
    loadingInterval = window.setInterval(() => {
      loadingTime++;
    }, 1000);
  }
  function hideLoading() {
    window.clearInterval(loadingInterval);
    loadingInterval = 0;
  }
  async function removal() {
    let blob: Blob = await imglyRemoveBackground(sourceFile, {
      // mode:'small'
      publicPath: '/background-removal/',
      progress: (key, current, total) => {
        console.log(`Downloading ${key}: (${current} of ${total}`);
      },
    });

    // The result is a blob encoded a1s PNG. It can be converted to an URL to be used as HTMLImage.src
    const url = URL.createObjectURL(blob);
    targetImage = url;
    console.log(url, 'sdf', blob);
  }

  function downloadImage() {
    const a = document.createElement('a');
    a.href = targetImage;
    a.download = 'removed.png';
    a.click();
    a.remove();
  }
</script>

<div class="bg-rm">
  <div class="source-list">
    <div class="image-input panel" on:keydown on:click={fileInputClick}>
      <div class="image">
        {#if sourceImage}
          <img src={sourceImage} alt="源图片" />
        {:else}
          <input bind:this={fileInput} type="file" class="d-none" on:change={handleFileChange} />
          <div class="ms-Button ms-Button--primary">
            <span class="ms-Button-label">上传图片</span>
          </div>
        {/if}
      </div>
    </div>
  </div>
  <div class="image-result">
    <div class="panel">
      {#if loadingInterval}
        <h1>loading{'.'.repeat(loadingTime % 2)}</h1>
      {:else if targetImage}
        <img src={targetImage} alt="图像" title="点击下载" on:keydown on:click={downloadImage} />
      {/if}
    </div>
  </div>
</div>

<style lang="less">
  .bg-rm {
    --gap: 10px;
    background-color: rgb(250, 250, 250);
    flex: 1;
    display: flex;
    .panel {
      background-color: #fff;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);
    }
    .source-list {
      box-sizing: content-box;
      display: flex;
      flex-direction: column;
      width: 200px;
      padding: var(--gap);
      overflow-y: auto;
      overflow-y: overlay;
    }
    .image-input {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      transition: box-shadow 0.2s ease;
      &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }
      .image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 200px;
        > img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
    .image-result {
      padding: var(--gap) var(--gap) var(--gap) 0;
      flex: 1;
      .panel {
        display: flex;
        width: 100%;
        height: 100%;
        > img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          cursor: pointer;
          transition: box-shadow 0.2s ease;
          &:hover {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          }
        }
      }
    }

    /* Fluent Design按钮样式 */
    .ms-Button {
      font-weight: 600;
      padding: 5px 10px;
      border-radius: 2px;
      background: #0078d4;
      color: #fff;
      display: inline-flex;
      align-items: center;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
    .d-none {
      display: none;
    }
    .ms-Button--primary {
      background: #0078d4;
    }

    .ms-Button:hover {
      background: #106ebe;
    }

    .ms-Button-label {
      margin-right: 8px;
    }
  }
</style>
