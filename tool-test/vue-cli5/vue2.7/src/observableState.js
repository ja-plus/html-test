import Vue from "vue";

export let state = Vue.observable({
    name: 'observe'
})
export function setState(k,v){
    state[k] = v;
}