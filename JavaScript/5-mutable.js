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

  insert(index, value) {
    if (index <= 0) return this.prepend(value);
    if (index >= this.length) return this.append(value);
    let current = this.head;
    let i = 0;
    while (i < index - 1) {
      current = current.next;
      i++;
    }
    current.next = { value, next: current.next };
    this.length++;
    return this;
  }

  delete(index) {
    if (this.head === null) throw new Error('List is empty');
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }
    if (index === 0) {
      this.head = this.head.next;
      this.length--;
      return this;
    }
    let current = this.head;
    let i = 0;
    while (i < index - 1) {
      current = current.next;
      i++;
    }
    current.next = current.next.next;
    this.length--;
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
    const result = new Array(this.length);
    let current = this.head;
    let i = 0;
    while (current !== null) {
      result[i++] = current.value;
      current = current.next;
    }
    return result;
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current !== null) {
      yield current.value;
      current = current.next;
    }
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
console.log(`list.at(1) ->`, list.at(1));
console.log(`[...list] ->`, [...list]);

list.append(0);
console.log(`after append(0) ->`, list.toArray());

list.insert(1, 4);
console.log(`after insert(1, 4) ->`, list.toArray());

list.delete(2);
console.log(`after delete(2) ->`, list.toArray());
