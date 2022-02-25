import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.at.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.array.flat.js";
import "core-js/modules/es.array.unscopables.flat.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.match-all.js";
import "core-js/modules/es.set.js";
import "core-js/modules/web.dom-exception.stack.js";
import "core-js/modules/web.structured-clone.js";
import "core-js/modules/es.promise.all-settled.js";
// 不会自动替换？
// import 'core-js/stable';
// import 'core-js/stable/structured-clone';
// import 'core-js/stable/array/at';
import Vue from 'vue/dist/vue.esm';
import comm from './comm.js';
console.log(comm.a);

const study = () => {};

const a = Math.pow(1, 2);
const arr = [11, ...[1, 2, 3]];
const b = [1, 2, 3].at(-1);
Object.entries({}); // 新增API

new Promise(() => {});
new Map();

class Parent {}

[].flat();
new Vue({});
String('a').matchAll('a', '1');
structuredClone({
  a: 1
});
Promise.allSettled([Promise.resolve()]);
