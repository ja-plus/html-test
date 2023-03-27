import _asyncToGenerator from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
var _context, _context2, _obj$fun;
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
var _marked = /*#__PURE__*/_regeneratorRuntime.mark(testGenerator);
import _Object$entries from "@babel/runtime-corejs3/core-js-stable/object/entries";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import _Map from "@babel/runtime-corejs3/core-js-stable/map";
import _flatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/flat";
import _matchAllInstanceProperty from "@babel/runtime-corejs3/core-js/instance/match-all";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.at.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.set.js";
import "core-js/modules/web.dom-exception.stack.js";
import "core-js/modules/web.structured-clone.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.promise.all-settled.js";
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
const a = Math.pow(1, 2);
const arr = [11, ...[1, 2, 3]];
const b = [1, 2, 3].at(-1);
_Object$entries({});
// 新增API
new _Promise(() => {});
new _Map();
class Parent {
  constructor() {
    _defineProperty(this, "name", 'a');
  }
}
_flatInstanceProperty(_context = []).call(_context);
new Vue({});
_matchAllInstanceProperty(_context2 = String('a')).call(_context2, 'a', '1');
structuredClone({
  a: 1
});
_Promise.allSettled([_Promise.resolve()]);
function asaw() {
  return _asaw.apply(this, arguments);
}
function _asaw() {
  _asaw = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _Promise.resolve();
        case 2:
        case "end":
          return _context4.stop();
      }
    }, _callee);
  }));
  return _asaw.apply(this, arguments);
}
let obj = {};
(_obj$fun = obj.fun) === null || _obj$fun === void 0 ? void 0 : _obj$fun.call(obj);
obj === null || obj === void 0 ? void 0 : obj.a;
let s_num = 1000;
function testGenerator() {
  return _regeneratorRuntime.wrap(function testGenerator$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        _context3.next = 2;
        return 1;
      case 2:
      case "end":
        return _context3.stop();
    }
  }, _marked);
}
