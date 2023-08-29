/** @module refDoc */
/**
 * @typedef {object} Person
 * @param {string} name
 * @param {number} age
 * @param {string} address
 *
 * @callback Run
 * @param {number|string} id
 */

export const a = '';

export class A {
  /**
   * @private
   * @type {number}
   */
  a;
  /**
   * bbb
   * @protected
   * @type {string}
   */
  b;
  /** @type {boolean} */
  c;

  /**
   * @param {number} id
   */
  constructor(id) {
    this.a = 1;
  }
}
