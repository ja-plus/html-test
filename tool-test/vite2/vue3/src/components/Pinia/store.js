import { defineStore } from 'pinia';
export default defineStore({
  id: 'store',
  state: () => ({
    count: 0,
    arr: [0]
  }),
  getters: {
    double: state => state.count * 2
  },
  actions: {
    increment(payload){
      console.log('payload :>> ', payload);
      this.count++;
    }
  }
});