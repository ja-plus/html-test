<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let options: { label: string; value: string | number }[] = [];
  export let value = options[0]?.value;
  const dispatch = createEventDispatcher<{
    change: string | number;
  }>();
  function handleItemClick(v: string | number) {
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
    .nav-item {
      cursor: pointer;
      &:not(:last-child) {
        border-bottom: var(--border);
      }
      &:hover {
        background-color: #eee;
      }
      &.current {
        background-color: #ddd;
      }
      .nav-item-text {
        padding: 6px 10px;
      }
    }
  }
</style>
