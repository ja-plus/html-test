<svelte:options tag="my-dialog"/>
<div class="modal">
    <header >{title}</header>
    <section>
        <button on:click={handleClick}>num:{num}</button>
        <slot></slot>
    </section>
    <footer>
        <button on:click={handleConfirm}>确认</button>
        <button>取消</button>
    </footer>
</div>
<script>
  import { createEventDispatcher } from "svelte";

export let title = 'Title'
let num = 0;
const dispatch = createEventDispatcher();
function handleClick(){
    num +=1;
}
function handleConfirm(){
    dispatch('confirm')
}
</script>
<style lang="less">
    .modal {
        border-radius: 5px;
        box-shadow: 0 0 10px #aaa;
        border: 1px solid #aaa;
        &>header{
            background-color:#aaa;
            padding:10px;
        }
        &>article {
            padding: 10px;
        }
        &>footer{
            padding:10px;
        }
    }
</style>