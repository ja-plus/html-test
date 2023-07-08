<script lang="ts">
  //@ts-ignore
  import imglyRemoveBackground from '@imgly/background-removal';
  function handleFileChange(e: Event) {
    debugger;
    let file: File = (e.target as any).files[0];
    removal(file);
    // let fr = new FileReader();
    // fr.onload=(e)=>{
    //     let ab = fr.result
    //     removal(ab)
    // }
    // fr.readAsArrayBuffer(file);
  }

  async function removal(image_src) {
    imglyRemoveBackground(image_src).then((blob: Blob) => {
      // The result is a blob encoded as PNG. It can be converted to an URL to be used as HTMLImage.src
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'removed.jpg';
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }
</script>

<div>
  <h1>background removal</h1>
  <input type="file" on:change={handleFileChange} />
</div>
