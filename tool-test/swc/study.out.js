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
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
var __generator = this && this.__generator || function(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.async-iterator.js";
import "core-js/modules/es.symbol.has-instance.js";
import "core-js/modules/es.symbol.match.js";
import "core-js/modules/es.symbol.match-all.js";
import "core-js/modules/es.symbol.replace.js";
import "core-js/modules/es.symbol.search.js";
import "core-js/modules/es.symbol.species.js";
import "core-js/modules/es.symbol.split.js";
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.aggregate-error.js";
import "core-js/modules/es.aggregate-error.cause.js";
import "core-js/modules/es.array.at.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.find-last.js";
import "core-js/modules/es.array.find-last-index.js";
import "core-js/modules/es.array.flat.js";
import "core-js/modules/es.array.flat-map.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.array.last-index-of.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.push.js";
import "core-js/modules/es.array.reduce.js";
import "core-js/modules/es.array.reduce-right.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.sort.js";
import "core-js/modules/es.array.species.js";
import "core-js/modules/es.array.splice.js";
import "core-js/modules/es.array.unscopables.flat.js";
import "core-js/modules/es.array.unscopables.flat-map.js";
import "core-js/modules/es.array.unshift.js";
import "core-js/modules/es.function.has-instance.js";
import "core-js/modules/es.global-this.js";
import "core-js/modules/es.json.stringify.js";
import "core-js/modules/es.json.to-string-tag.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.math.acosh.js";
import "core-js/modules/es.math.hypot.js";
import "core-js/modules/es.math.to-string-tag.js";
import "core-js/modules/es.number.to-exponential.js";
import "core-js/modules/es.object.define-getter.js";
import "core-js/modules/es.object.define-setter.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.object.from-entries.js";
import "core-js/modules/es.object.get-own-property-descriptors.js";
import "core-js/modules/es.object.has-own.js";
import "core-js/modules/es.object.lookup-getter.js";
import "core-js/modules/es.object.lookup-setter.js";
import "core-js/modules/es.object.values.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.promise.all-settled.js";
import "core-js/modules/es.promise.any.js";
import "core-js/modules/es.promise.finally.js";
import "core-js/modules/es.reflect.to-string-tag.js";
import "core-js/modules/es.regexp.constructor.js";
import "core-js/modules/es.regexp.dot-all.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.flags.js";
import "core-js/modules/es.regexp.test.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.string.at-alternative.js";
import "core-js/modules/es.string.ends-with.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.string.match.js";
import "core-js/modules/es.string.match-all.js";
import "core-js/modules/es.string.pad-end.js";
import "core-js/modules/es.string.pad-start.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.string.replace-all.js";
import "core-js/modules/es.string.search.js";
import "core-js/modules/es.string.split.js";
import "core-js/modules/es.string.starts-with.js";
import "core-js/modules/es.string.trim.js";
import "core-js/modules/es.string.trim-end.js";
import "core-js/modules/es.string.trim-start.js";
import "core-js/modules/es.typed-array.float32-array.js";
import "core-js/modules/es.typed-array.float64-array.js";
import "core-js/modules/es.typed-array.int8-array.js";
import "core-js/modules/es.typed-array.int16-array.js";
import "core-js/modules/es.typed-array.int32-array.js";
import "core-js/modules/es.typed-array.uint8-array.js";
import "core-js/modules/es.typed-array.uint8-clamped-array.js";
import "core-js/modules/es.typed-array.uint16-array.js";
import "core-js/modules/es.typed-array.uint32-array.js";
import "core-js/modules/es.typed-array.at.js";
import "core-js/modules/es.typed-array.fill.js";
import "core-js/modules/es.typed-array.find-last.js";
import "core-js/modules/es.typed-array.find-last-index.js";
import "core-js/modules/es.typed-array.from.js";
import "core-js/modules/es.typed-array.iterator.js";
import "core-js/modules/es.typed-array.of.js";
import "core-js/modules/es.typed-array.set.js";
import "core-js/modules/es.typed-array.sort.js";
import "core-js/modules/es.typed-array.to-string.js";
import "core-js/modules/es.weak-map.js";
import "core-js/modules/es.weak-set.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/web.dom-exception.stack.js";
import "core-js/modules/web.immediate.js";
import "core-js/modules/web.queue-microtask.js";
import "core-js/modules/web.structured-clone.js";
import "core-js/modules/web.url.js";
import "core-js/modules/web.url.to-json.js";
import "core-js/modules/web.url-search-params.js";
var _obj_fun;
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
    _asaw = _asyncToGenerator(function() {
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        Promise.resolve()
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return _asaw.apply(this, arguments);
}
let obj = {};
(_obj_fun = obj.fun) === null || _obj_fun === void 0 ? void 0 : _obj_fun.call(obj);
obj === null || obj === void 0 ? void 0 : obj.a;


//# sourceMappingURL=study.out.js.map