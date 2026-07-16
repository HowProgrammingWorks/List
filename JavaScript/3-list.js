'use strict';

const cons = (value, next = null) => Object.freeze({ value, next });

const first = (list) => list.value;
const rest = (list) => list.next;

const list = (...values) => {
  let result = null;
  for (let i = values.length - 1; i >= 0; i--) {
    result = cons(values[i], result);
  }
  return result;
};

const iterate = (list, fn) => {
  for (let cur = list; cur !== null; cur = rest(cur)) {
    fn(first(cur));
  }
};

// Usage

const numbers = list(1, 2, 3, 4, 5);
iterate(numbers, console.log);
