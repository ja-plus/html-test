import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
interface Person {
  name: string;
  age: number;
}
const person: Person = {
  name: 'person name',
  age: 1,
};
const store = new Vuex.Store({
  state: {
    count: 0,
    inputText: 'inputText',
    person: person,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setInputText(state, payload) {
      state.inputText = payload + '_' + String(payload.length);
    },
  },
  actions: {
    updateInputText({ state, commit }, payload) {
      commit('setInputText', payload);
    },
  },
});
export default store;
