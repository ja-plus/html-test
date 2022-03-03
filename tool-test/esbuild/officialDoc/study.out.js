(() => {
  var __defProp = Object.defineProperty;
  var __pow = Math.pow;
  var __defNormalProp = (obj, key, value) =>
    key in obj
      ? __defProp(obj, key, {
          enumerable: true,
          configurable: true,
          writable: true,
          value,
        })
      : (obj[key] = value);
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value);
    return value;
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError('Cannot add the same private member more than once');
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };

  // officialDoc/study.js
  var a = __pow(1, 2);
  var arr = [11, ...[1, 2, 3]];
  var b = [1, 2, 3].at(-1);
  a == null ? void 0 : a.b;
  a != null ? a : b;
  Object.entries({});
  new Promise(() => {});
  var map = /* @__PURE__ */ new Map();
  map.set('k', 'v');
  var set = /* @__PURE__ */ new Set();
  set.add('v');
  var _privateVar, _privateFun, privateFun_fn, _stPrivaateFun, stPrivaateFun_fn;
  var Parent = class {
    constructor() {
      __privateAdd(this, _privateFun);
      __privateAdd(this, _privateVar, 1);
    }
    static stFun() {}
  };
  _privateVar = new WeakMap();
  _privateFun = new WeakSet();
  privateFun_fn = function () {};
  _stPrivaateFun = new WeakSet();
  stPrivaateFun_fn = function () {};
  __privateAdd(Parent, _stPrivaateFun);
  __publicField(Parent, 'a', 1);
  var parent = new Parent();
  var numSplit = 1e6;
  console.log(numSplit);
  [].flat();
  String('a').matchAll('a', '1');
  structuredClone({ a: 1 });
  Promise.allSettled([Promise.resolve()]);
})();
