<template lang="pug">
div
  h1 Pinia
  div
    button(@click="resetCount") reset store
  div 
    button(@click="countPlus") store.count++
  div count : {{count}}
  div inputText: 
    input(v-model="inputText")
  hr
  Child
</template>
//
<script lang="ts">
import Child from './Child.vue';
import { Component, Vue } from 'vue-property-decorator';
import { useCounterStore } from './store';
import { mapState } from 'pinia';
const store = useCounterStore();
@Component({
  components: {
    Child,
  },
  computed: {
    ...mapState(useCounterStore, ['count']), // 这里会有代码提示，好！
  },
})
export default class extends Vue {
  // store = store
  get inputText(): string {
    return store.$state.inputText;
  }
  set inputText(val: string) {
    store.updateInputText(val);
  }

  countPlus() {
    // this.count;
    this.inputText += '1';
    // store.increment();
    store.$patch(state => {
      state.count++;
    });
  }
  resetCount() {
    store.$reset();
  }
}
</script>
<!-- 官方写法
<script lang="ts">
import { mapState } from 'pinia';
import Vue from 'vue';
import Child from './Child.vue';
import { useCounterStore } from './store';
const store = useCounterStore();
export default Vue.extend({
  components: {
    Child,
  },
  computed: {
    ...mapState(useCounterStore, ['inputText']), // 这里有类型检查
  },
  methods: {
    countPlus() {
      // this.count;
      this.inputText += '1';
      // store.increment();
      store.$patch(state => {
        state.count++;
      });
    },
    resetCount() {
      store.$reset();
    },
  },
});
</script>-->
