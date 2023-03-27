// 不会自动替换？
// import 'core-js/stable';
// import 'core-js/stable/structured-clone';
// import 'core-js/stable/array/at';
// import 'regenerator-runtime';
import Vue from 'vue/dist/vue.esm';
import comm from './comm.js';
console.log(comm.a);
comm?.a;
const study = () => {};
const a = 1 ** 2;
const arr = [11, ...[1, 2, 3]];
const b = [1, 2, 3].at(-1);
Object.entries({});
// 新增API
new Promise(() => {});
new Map();

class Parent {
  name = 'a';
}
[].flat();
new Vue({});
String('a').matchAll('a', '1');
structuredClone({ a: 1 });

Promise.allSettled([Promise.resolve()]);
async function asaw() {
  await Promise.resolve();
}

let obj = {};
obj.fun?.();
obj?.a;

let s_num = 1_000;

function* testGenerator() {
  yield 1;
}
