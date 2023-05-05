const { insertToOrderedArray } = require('./halfInsert');

test('普通插入', () => {
  expect(
    insertToOrderedArray([1, 2, 4, 5], 3, (item, newItem) => {
      return item < newItem ? -1 : 1;
    }),
  ).toStrictEqual([1, 2, 3, 4, 5]);
  expect(
    insertToOrderedArray([5, 4, 2, 1], 3, (item, newItem) => {
      return item > newItem ? -1 : 1;
    }),
  ).toStrictEqual([5, 4, 3, 2, 1]);
});

test('普通插入,边界情况', () => {
  expect(
    insertToOrderedArray([1, 2, 3, 4], 5, (item, newItem) => {
      return item < newItem ? -1 : 1;
    }),
  ).toStrictEqual([1, 2, 3, 4, 5]);
  expect(
    insertToOrderedArray([1, 2, 3, 4, 5], 0, (item, newItem) => {
      return item < newItem ? -1 : 1;
    }),
  ).toStrictEqual([0, 1, 2, 3, 4, 5]);
});
test('普通插入,空数组情况', () => {
  expect(
    insertToOrderedArray([], 5, (item, newItem) => {
      return item < newItem ? -1 : 1;
    }),
  ).toStrictEqual([5]);
  expect(
    insertToOrderedArray([], 0, (item, newItem) => {
      return item < newItem ? -1 : 1;
    }),
  ).toStrictEqual([0]);
});

test('对象', () => {
  expect(
    insertToOrderedArray([{ id: 1 }, { id: 2 }, { id: 4 }, { id: 5 }], { id: 3 }, (item, newItem) => {
      return item.id < newItem.id ? -1 : 1;
    }),
  ).toStrictEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);
  expect(
    insertToOrderedArray([{ id: 5 }, { id: 4 }, { id: 2 }, { id: 1 }], { id: 3 }, (item, newItem) => {
      return item.id > newItem.id ? -1 : 1;
    }),
  ).toStrictEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }].reverse());
});

test('值相同时，用另一个字段比较', () => {
  expect(
    insertToOrderedArray(
      [
        { id: 1, age: 1 },
        { id: 2, age: 2 },
        // { id: 4, age: 2 },
        { id: 5, age: 3 },
      ],
      { id: 3, age: 2 },
      (item, newItem) => {
        if (item.age < newItem.age) {
          return -1;
        } else if (item.age > newItem.age) {
          return 1;
        } else if (item.id < newItem.id) {
          return -1;
        } else if (item.id > newItem.id) {
          return 1;
        } else {
          return 0;
        }
      },
    ),
  ).toStrictEqual([
    { id: 1, age: 1 },
    { id: 2, age: 2 },
    { id: 3, age: 2 },
    // { id: 4, age: 2 },
    { id: 5, age: 3 },
  ]);
});
