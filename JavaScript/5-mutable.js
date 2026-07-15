'use strict';

class List {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  prepend(value) {
    this.head = { value, next: this.head };
    this.length++;
    return this;
  }

  append(value) {
    const node = { value, next: null };
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
    return this;
  }

  at(index) {
    let current = this.head;
    let i = 0;
    while (current !== null && i < index) {
      current = current.next;
      i++;
    }
    return current ? current.value : undefined;
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

// Usage

const list = new List();
list.prepend(1);
list.prepend(2);
list.prepend(3);

//   list ──▶ List { length: 3 }
//                  │
//                  ▼ head
//                ┌───┐    ┌───┐    ┌───┐
//                │ 3 │───▶│ 2 │───▶│ 1 │───▶ null
//                └───┘    └───┘    └───┘

console.log(`list.toArray() ->`, list.toArray());
