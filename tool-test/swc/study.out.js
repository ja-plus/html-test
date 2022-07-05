function _arrayLikeToArray(arr1, len) {
    if (len == null || len > arr1.length) len = arr1.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr1[i];
    return arr2;
}
function _arrayWithoutHoles(arr3) {
    if (Array.isArray(arr3)) return _arrayLikeToArray(arr3);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperty(obj1, key, value) {
    if (key in obj1) {
        Object.defineProperty(obj1, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj1[key] = value;
    }
    return obj1;
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr4) {
    return _arrayWithoutHoles(arr4) || _iterableToArray(arr4) || _unsupportedIterableToArray(arr4) || _nonIterableSpread();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
import regeneratorRuntime from "regenerator-runtime";
import Vue from "vue/dist/vue.esm";
import comm from "./comm.js";
var ref;
console.log(comm.a);
comm === null || comm === void 0 ? void 0 : comm.a;
var study = function() {};
var a = Math.pow(1, 2);
var arr = [
    11
].concat(_toConsumableArray([
    1,
    2,
    3
]));
var b = [
    1,
    2,
    3
].at(-1);
Object.entries({});
// 新增API
new Promise(function() {});
new Map();
var Parent = function Parent() {
    "use strict";
    _classCallCheck(this, Parent);
    _defineProperty(this, "name", "a");
};
[].flat();
new Vue({});
String("a").matchAll("a", "1");
structuredClone({
    a: 1
});
Promise.allSettled([
    Promise.resolve()
]);
function asaw() {
    return _asaw.apply(this, arguments);
}
function _asaw() {
    _asaw = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_ctx) {
            while(1)switch(_ctx.prev = _ctx.next){
                case 0:
                    _ctx.next = 2;
                    return Promise.resolve();
                case 2:
                case "end":
                    return _ctx.stop();
            }
        }, _callee);
    }));
    return _asaw.apply(this, arguments);
}
var obj = {};
(ref = obj.fun) === null || ref === void 0 ? void 0 : ref.call(obj);
obj === null || obj === void 0 ? void 0 : obj.a;


//# sourceMappingURL=study.out.js.map