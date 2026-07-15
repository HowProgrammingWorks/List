'use strict';

const cons = (value, next = null) => ({ value, next });

// Usage

const empty = null;
const one = cons(1, empty);
const two = cons(2, one);
const three = cons(3, two);
const branch1 = cons(10, three);
const branch2 = cons(20, three);
const branch3 = cons(30, three);

console.log(`branch1 ->`);
console.dir(branch1, { depth: null });
console.log(`branch2 ->`);
console.dir(branch2, { depth: null });
console.log(`branch3 ->`);
console.dir(branch3, { depth: null });
