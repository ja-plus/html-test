<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let options: { label: string; value: string }[] = [];
  export let value = options[0]?.value;

  const dispatch = createEventDispatcher<{
    change: string;
  }>();

  function handleItemClick(v: string) {
    if (value === v) return;
    value = v;
    dispatch('change', v);
  }
</script>

<nav>
  {#each options as item (item.value)}
    <div class="nav-item" class:current={item.value === value} on:keydown on:click={() => handleItemClick(item.value)}>
      <slot {item}><div class="nav-item-text">{item.label}</div></slot>
    </div>
  {/each}
</nav>

<style lang="less">
  nav {
    width: 70px;
    .nav-item {
      position: relative;
      cursor: pointer;
      padding: 6px 10px;
      color: #242424;
      display: flex;
      align-items: center;

      &::before {
        content: '';
        width: 3px;
        height: 16px;
        left: 0;
        position: absolute;
        visibility: hidden;
      }
      &:hover {
        &::before {
          visibility: visible;
          background-color: #c7c7c7;
        }
      }
      &.current {
        font-weight: bold;
        &::before {
          visibility: visible;
          background-color: #0f6cbd;
        }
      }
      .nav-item-text {
        padding: 6px 10px;
      }
    }
  }
</style>
