import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('counter', () => {
  const count = ref(0);
  const arr = [0];
  function increment(payload){
    console.log('functionStore.payload :>> ', payload);
    count.value += payload.count;
  }
  return { count, arr, increment };
});