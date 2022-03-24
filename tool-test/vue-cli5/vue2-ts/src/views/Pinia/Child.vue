<template lang="pug">
    div
        b Child
        div store.count: {{count}}
        div store.inputText: {{inputText}}
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { useCounterStore } from './store';
const store = useCounterStore();

@Component
export default class Child extends Vue {
  get count() {
    return store.$state.count;
  }
  get doubleCount() {
    return store.doubleCount;
  }
  get inputText() {
    return store.$state.inputText;
  }
  @Watch('count')
  countChange(val: number) {
    console.log('Child: watch count ', val);
  }
}
</script>
