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
import regeneratorRuntime from "regenerator-runtime";
var ref;
import Vue from "vue/dist/vue.esm";
import comm from "./comm.js";
console.log(comm.a);
comm === null || comm === void 0 ? void 0 : comm.a;
const study = ()=>{};
const a = Math.pow(1, 2);
const arr = [
    11,
    ...[
        1,
        2,
        3
    ]
];
const b = [
    1,
    2,
    3
].at(-1);
Object.entries({});
// 新增API
new Promise(()=>{});
new Map();
class Parent {
    constructor(){
        _defineProperty(this, "name", "a");
    }
}
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
let obj = {};
(ref = obj.fun) === null || ref === void 0 ? void 0 : ref.call(obj);
obj === null || obj === void 0 ? void 0 : obj.a;


//# sourceMappingURL=study.out.js.map