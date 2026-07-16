'use strict';

class ConsList {
  value = undefined;
  next = null;
  size = 0;

  static EMPTY = new ConsList();

  constructor(value = undefined, next = null, size = 0) {
    this.value = value;
    this.next = next;
    this.size = size;
    Object.freeze(this);
  }

  first() {
    return this.value;
  }

  rest() {
    if (this.next === null) return ConsList.EMPTY;
    return this.next;
  }

  prepend(value = undefined) {
    const next = this.size === 0 ? null : this;
    return new ConsList(value, next, this.size + 1);
  }

  *[Symbol.iterator]() {
    let current = this;
    while (current && current.size !== 0) {
      yield current.value;
      current = current.next;
    }
  }
}

// Usage

const empty = new ConsList();
const one = empty.prepend(1);
const two = one.prepend(2);
const three = two.prepend(3);
const branch1 = three.prepend(10);
const branch2 = three.prepend(20);
const branch3 = three.prepend(30);

console.log(`[...branch1] ->`, [...branch1]);
console.log(`[...branch2] ->`, [...branch2]);
console.log(`[...branch3] ->`, [...branch3]);
