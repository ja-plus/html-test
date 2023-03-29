<script lang="ts">
  import { createWorker } from 'tesseract.js';
  async function transferImage2Text(imgData: File) {
    let worker = await createWorker({
      workerPath: 'js/worker.min.js',
      // dataPath: './lang',
      corePath: 'js/tesseract.js-core/tesseract-core.wasm.js',
      logger: m => {
        console.log(m);
      },
    });
    await worker.loadLanguage('chi_sim');
    await worker.initialize('chi_sim');
    const {
      data: { text },
    } = await worker.recognize(imgData);
    // console.log(text);
    // await worker.terminate();
    return text;
  }
  let resultText = '';
  async function handleFileChange(e) {
    let file: File = e.target.files[0];
    resultText = await transferImage2Text(file);
  }
</script>

<main>
  <div class="input-file-content">
    <input type="file" on:change={handleFileChange} />
  </div>
  <pre class="text-content">{resultText}</pre>
</main>

<style>
  main {
    display: flex;
    height: 100%;
  }
  .input-file-content {
    flex: 1;
  }
  .text-content {
    flex: 1;
    border: 1px dashed #aaa;
  }
</style>
