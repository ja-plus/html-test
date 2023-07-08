var _context, _context2, _obj$fun;
import _Object$entries from "@babel/runtime-corejs3/core-js-stable/object/entries";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _Map from "@babel/runtime-corejs3/core-js-stable/map";
import _flatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/flat";
import _matchAllInstanceProperty from "@babel/runtime-corejs3/core-js/instance/match-all";
import "core-js/modules/es.array.at.js";
import "core-js/modules/web.dom-exception.stack.js";
import "core-js/modules/web.structured-clone.js";
// 不会自动替换？
// import 'core-js/stable';
// import 'core-js/stable/structured-clone';
// import 'core-js/stable/array/at';
// import 'regenerator-runtime';
import Vue from 'vue/dist/vue.esm';
import comm from './comm.js';
console.log(comm.a);
comm === null || comm === void 0 ? void 0 : comm.a;
const study = () => {};
const a = 1 ** 2;
const arr = [11, ...[1, 2, 3]];
const obj1 = {
  a: 1
};
const obj2 = {
  ...obj1
};
const b = [1, 2, 3].at(-1);
_Object$entries({});
// 新增API
new _Promise(() => {});
new _Map();
class Parent {
  name = 'a';
}
_flatInstanceProperty(_context = []).call(_context);
new Vue({});
_matchAllInstanceProperty(_context2 = String('a')).call(_context2, 'a', '1');
structuredClone({
  a: 1
});
_Promise.allSettled([_Promise.resolve()]);
async function asaw() {
  await _Promise.resolve();
}
let obj = {};
(_obj$fun = obj.fun) === null || _obj$fun === void 0 ? void 0 : _obj$fun.call(obj);
obj === null || obj === void 0 ? void 0 : obj.a;
let s_num = 1_000;
function* testGenerator() {
  yield 1;
}
