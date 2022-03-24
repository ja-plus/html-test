import Vue from 'vue';
import { defineStore, createPinia, PiniaVuePlugin } from 'pinia';
Vue.use(PiniaVuePlugin);
export default createPinia();

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
      inputText: 'defaultText',
    };
  },
  getters: {
    doubleCount: state => state.count * 2,
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++;
    },
    updateInputText(payload: string): void {
      this.inputText = payload;
    },
    /**store 间获取数据测试 */
    getPersonStr() {
      this.inputText = personStore().personString;
    },
  },
});

interface Person {
  name: string;
  age: number;
}
export const personStore = defineStore('person', {
  state: () => {
    return {
      name: 'Tom',
      age: 12,
    };
  },
  getters: {
    personString(): string {
      return this.name + '(' + this.age + ')';
    },
  },
  actions: {
    getInfo(payload: Person) {
      this.$patch({
        name: payload.name,
        age: payload.age,
      });
    },
  },
});
