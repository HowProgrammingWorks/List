'use strict';

class DoubleList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  #node(index) {
    if (index < this.length / 2) {
      let current = this.head;
      let i = 0;
      while (i < index) {
        current = current.next;
        i++;
      }
      return current;
    }
    let current = this.tail;
    let i = this.length - 1;
    while (i > index) {
      current = current.prev;
      i--;
    }
    return current;
  }

  prepend(value) {
    const node = { value, prev: null, next: this.head };
    if (this.head === null) this.tail = node;
    else this.head.prev = node;
    this.head = node;
    this.length++;
    return this;
  }

  // Better than singly linked: O(1) via tail, no walk to the end.
  //
  //   head                         tail
  //     │                            │
  //     ▼                            ▼
  //   ┌───┐ ◀──▶ ┌───┐ ◀──▶ ┌───┐ ◀──▶ ┌───┐
  //   │ 3 │      │ 2 │      │ 1 │      │ 0 │  ← append
  //   └───┘      └───┘      └───┘      └───┘
  append(value) {
    const node = { value, prev: this.tail, next: null };
    if (this.tail === null) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.length++;
    return this;
  }

  // Better than singly linked: start from the nearer end (head or tail).
  insert(index, value) {
    if (index <= 0) return this.prepend(value);
    if (index >= this.length) return this.append(value);
    const next = this.#node(index);
    const prev = next.prev;
    const node = { value, prev, next };
    prev.next = node;
    next.prev = node;
    this.length++;
    return this;
  }

  // Better than singly linked: unlink with prev/next; last node via tail.
  //
  //   … ◀──▶ ┌───┐ ◀──▶ ┌───┐ ◀──▶ ┌───┐ ◀──▶ …
  //           │ A │      │ X │      │ B │
  //           └───┘      └───┘      └───┘
  //             │                      │
  //             └─────────▶◀───────────┘  delete X
  delete(index) {
    if (this.head === null) throw new Error('List is empty');
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }
    const node = this.#node(index);
    if (node.prev === null) this.head = node.next;
    else node.prev.next = node.next;
    if (node.next === null) this.tail = node.prev;
    else node.next.prev = node.prev;
    this.length--;
    return this;
  }

  // Better than singly linked: start from the nearer end (head or tail).
  at(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }
    return this.#node(index).value;
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

const list = new DoubleList();
list.prepend(1);
list.prepend(2);
list.prepend(3);

//   list ──▶ DoubleList { length: 3 }
//              │               │
//              ▼ head          ▼ tail
//            ┌───┐ ◀──▶ ┌───┐ ◀──▶ ┌───┐
//            │ 3 │      │ 2 │      │ 1 │
//            └───┘      └───┘      └───┘

console.log(`list.toArray() ->`, list.toArray());
console.log(`list.at(1) ->`, list.at(1));
console.log(`[...list] ->`, [...list]);

list.append(0);
console.log(`after append(0) ->`, list.toArray());

list.insert(1, 4);
console.log(`after insert(1, 4) ->`, list.toArray());

list.delete(2);
console.log(`after delete(2) ->`, list.toArray());
