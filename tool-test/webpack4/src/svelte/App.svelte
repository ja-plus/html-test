<ChildComponent>
  <header slot="header">{name}</header>
  <span>
    header: <input type="text" bind:value={name}>
  <button on:click={count}>num: {num},doubleNum: {doubleNum}</button>
  arr:{arr}
  </span>
</ChildComponent>
<ChildComponent color="orange">
  <header slot="header">slot header</header>
  <span>slot</span>
</ChildComponent>
<script>
  import ChildComponent from './childComponent.svelte'
  export let name = 'svelte';
  let num = 0;
  $: doubleNum = num * 2;
  $: {
    console.log('svelte:doubleNum', doubleNum)
  }
  let arr = []
  function count(){
    num++;
    arr = arr.concat([num]) // 赋值才能更新引用类型
  }
</script>