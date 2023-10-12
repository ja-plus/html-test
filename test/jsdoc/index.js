/**
 * @typedef {import('./refDoc').Person} Person
 * @typedef {import('./refDoc').Run<number>} Run
 * @typedef {import('./refDoc').A} A
 * @typedef {import('./test').TsType} TsType
 */

/** @type {Person} */
const person = {};

/** @type {number[]} */
const arr = [];
arr[0] = 1;

/**
 * @enum {number}
 */
const Type = {
  a: 1,
  b: 2,
};
Type.a = 2;

/**
 * @typedef MyObj
 * @prop {string} name
 * @prop {number} id
 * @prop {Type} type
 */

/** @type {MyObj} */
let obj = {
  type: 3,
  name: '',
  id: 0,
};

/**
 * test
 * # Title
 * @param {number} id
 * @param {string} name
 * @returns {boolean}
 * @example
 * ```js
 * f(1,'haha'); // true
 * f('1','hh'); // false
 * ```
 * @author a <sss.qq.com>
 */
function f(id, name) {
  return;
}

/** @type {typeof obj} */
const tpof = {};

// -----------------------this--------------
/**
 * @this {MyObj}
 */
function testThis() {
  this.id;
}
