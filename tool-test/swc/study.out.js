// import 'core-js/stable';
import _async_to_generator from "@swc/helpers/src/_async_to_generator.mjs";
import _define_property from "@swc/helpers/src/_define_property.mjs";
import _ts_generator from "@swc/helpers/src/_ts_generator.mjs";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.string.at-alternative.js";
import "core-js/modules/es.array.at.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.array.flat.js";
import "core-js/modules/es.array.unscopables.flat.js";
import "core-js/modules/es.string.match-all.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/web.dom-exception.stack.js";
import "core-js/modules/web.structured-clone.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.promise.all-settled.js";
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
        _define_property(this, "name", "a");
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
    _asaw = _async_to_generator(function() {
        return _ts_generator(this, function(_state) {
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
let s_num = 1000;
function testGenerator() {
    return _ts_generator(this, function(_state) {
        switch(_state.label){
            case 0:
                return [
                    4,
                    1
                ];
            case 1:
                _state.sent();
                return [
                    2
                ];
        }
    });
}

