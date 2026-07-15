'use strict';

const cons = (value, next = null) => ({ value, next });

const first = (list) => list.value; // car / head
const rest = (list) => list.next; // cdr / tail

const list = (...values) => {
  let result = null;
  for (let i = values.length - 1; i >= 0; i--) {
    result = cons(values[i], result);
  }
  return result;
};

const iterate = (list, fn) => {
  for (let current = list; current !== null; current = rest(current)) {
    fn(first(current));
  }
};

// Usage

const numbers = list(1, 2, 3, 4, 5);
iterate(numbers, console.log);
