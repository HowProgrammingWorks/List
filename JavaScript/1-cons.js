'use strict';

const cons = (value, next = null) => Object.freeze({ value, next });

// Usage
//
//   branch1   branch2   branch3
//      │         │         │
//      ▼         ▼         ▼
//     [10]      [20]      [30]
//      │         │         │
//      └────┬────┴─────────┘
//           │
//           ▼
//          [3] ← three
//           │
//           ▼
//          [2] ← two
//           │
//           ▼
//          [1] ← one
//           │
//           ▼
//         null ← empty

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
