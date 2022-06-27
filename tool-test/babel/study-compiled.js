var _obj$fun;

import "regenerator-runtime/runtime.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
comm === null || comm === void 0 ? void 0 : comm.a;

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

function asaw() {
  return _asaw.apply(this, arguments);
}

function _asaw() {
  _asaw = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Promise.resolve();

        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _asaw.apply(this, arguments);
}

let obj = {};
(_obj$fun = obj.fun) === null || _obj$fun === void 0 ? void 0 : _obj$fun.call(obj);
obj === null || obj === void 0 ? void 0 : obj.a;
