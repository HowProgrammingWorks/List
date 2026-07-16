'use strict';

const cons = (value, next = null) => Object.freeze({ value, next });

const first = (list) => list.value; // car / head
const rest = (list) => list.next; // cdr / tail

const iterate = (list, fn) => {
  for (let cur = list; cur !== null; cur = rest(cur)) {
    fn(first(cur));
  }
};

// Usage

const empty = null;
const one = cons(1, empty);
const two = cons(2, one);
const three = cons(3, two);
const branch1 = cons(10, three);
const branch2 = cons(20, three);
const branch3 = cons(30, three);

console.log(`branch1 ->`);
iterate(branch1, console.log);

console.log(`branch2 ->`);
iterate(branch2, console.log);

console.log(`branch3 ->`);
iterate(branch3, console.log);
