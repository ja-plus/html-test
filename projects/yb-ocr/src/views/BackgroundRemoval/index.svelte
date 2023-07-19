<script lang="ts">
  import imglyRemoveBackground from '@imgly/background-removal';
  let sourceFile: File = new File([], 'empty.jpg');

  let sourceImage = '';
  let targetImage: string = '';

  let loadingInterval = 0;
  let loadingTime = 0;

  function handleFileChange(e: Event) {
    sourceFile = (e.target as any).files[0];
    URL.revokeObjectURL(sourceImage);
    sourceImage = URL.createObjectURL(sourceFile);
    removal();
  }

  function showLoading() {
    window.clearInterval(loadingInterval);
    loadingInterval = window.setInterval(() => {
      loadingTime++;
    }, 1000);
  }
  async function removal() {
    targetImage = 'loading';
    showLoading();
    imglyRemoveBackground(sourceFile, {
      publicPath: '/background-removal/',
      progress: (key, current, total) => {
        console.log(`Downloading ${key}: (${current} of ${total}`);
      },
    }).then((blob: Blob) => {
      // The result is a blob encoded as PNG. It can be converted to an URL to be used as HTMLImage.src
      const url = URL.createObjectURL(blob);
      targetImage = url;
      // console.log(url, 'sdf', blob);
    });
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
  <div class="image--wrapper">
    <div class="image image-source">
      {#if sourceImage}
        <img src={sourceImage} alt="源" />
      {:else}
        <input type="file" on:change={handleFileChange} />
      {/if}
    </div>
    <div class="image image-target">
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
    background-color: rgb(250, 250, 250);
    flex: 1;
    .image--wrapper {
      display: flex;
      justify-content: center;
      gap: 10px;
      padding: 10px;
      flex: 1;
      height: 100%;

      .image {
        height: 100%;
        display: flex;
        background-color: #fff;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);
        &.image-source {
          width: 200px;
          height: 200px;
        }
        &.image-target {
          flex: 1;
          > img {
            cursor: pointer;
            transition: transform 0.2s ease;
            &:hover {
              transform: scale(1.1);
            }
          }
        }
        > img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
</style>
