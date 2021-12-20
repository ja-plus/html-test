"use strict";

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.map.js");

var _vue = _interopRequireDefault(require("vue/dist/vue.esm"));

var _comm = _interopRequireDefault(require("./comm.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import 'core-js/stable';
console.log(_comm.default.a);

const study = () => {};

const a = Math.pow(1, 2);
const arr1 = [1, 2, 3];
const arr2 = [11, ...arr1];
const b = [1, 2, 3].at(-1);
Object.entries({}); // 新增API

new Promise(() => {});
new Map();

class Parent {}

new _vue.default({});
