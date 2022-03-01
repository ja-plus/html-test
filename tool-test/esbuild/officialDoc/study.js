// 不会自动替换？
// import 'core-js/stable';
// import 'core-js/stable/structured-clone';
// import 'core-js/stable/array/at';

const study = () => {};
const a = 1 ** 2;
const arr = [11, ...[1, 2, 3]];
const b = [1, 2, 3].at(-1);
a?.b;
a ?? b;
Object.entries({});
// 新增API
new Promise(() => {});
let map = new Map();
map.set("k", "v");
let set = new Set();
set.add("v");

class Parent {
  static a = 1;
  static stFun() {}
  #privateVar = 1;
  #privateFun() {}
  static #stPrivaateFun() {}
}
let parent = new Parent();

let numSplit = 1_000_000;
console.log(numSplit);
[].flat();
String("a").matchAll("a", "1");
structuredClone({ a: 1 });

Promise.allSettled([Promise.resolve()]);
