'use strict';

class CircularList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  #last() {
    let current = this.head;
    while (current.next !== this.head) {
      current = current.next;
    }
    return current;
  }

  #node(index) {
    let current = this.head;
    let i = 0;
    while (i < index) {
      current = current.next;
      i++;
    }
    return current;
  }

  prepend(value) {
    const node = { value, next: null };
    if (this.head === null) {
      node.next = node;
      this.head = node;
    } else {
      node.next = this.head;
      this.#last().next = node;
      this.head = node;
    }
    this.length++;
    return this;
  }

  // Last next always points back to head — no null terminator.
  //
  //         ┌──────────────────────────┐
  //         ▼                          │
  //       ┌───┐    ┌───┐    ┌───┐    ┌───┐
  // head─▶│ 3 │───▶│ 2 │───▶│ 1 │───▶│ 0 │──┘  append
  //       └───┘    └───┘    └───┘    └───┘
  append(value) {
    const node = { value, next: null };
    if (this.head === null) {
      node.next = node;
      this.head = node;
    } else {
      node.next = this.head;
      this.#last().next = node;
    }
    this.length++;
    return this;
  }

  insert(index, value) {
    if (index <= 0) return this.prepend(value);
    if (index >= this.length) return this.append(value);
    const prev = this.#node(index - 1);
    prev.next = { value, next: prev.next };
    this.length++;
    return this;
  }

  // Deleting head must retarget the last node back to the new head.
  //
  //         ┌────────────────┐
  //         ▼                │
  //       ┌───┐    ┌───┐    ┌───┐
  //       │ X │───▶│ 2 │───▶│ 1 │──┘
  //       └───┘    └───┘    └───┘
  //         ▲                │
  //         └──── delete ────┘  (last.next → new head)
  delete(index) {
    if (this.head === null) throw new Error('List is empty');
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }
    if (this.length === 1) {
      this.head = null;
      this.length = 0;
      return this;
    }
    if (index === 0) {
      const last = this.#last();
      this.head = this.head.next;
      last.next = this.head;
    } else {
      const prev = this.#node(index - 1);
      prev.next = prev.next.next;
    }
    this.length--;
    return this;
  }

  at(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }
    return this.#node(index).value;
  }

  // Start at any index and wrap around the ring.
  toArray(start = 0) {
    const result = new Array(this.length);
    if (this.head === null) return result;
    const offset = ((start % this.length) + this.length) % this.length;
    let current = this.#node(offset);
    for (let i = 0; i < this.length; i++) {
      result[i] = current.value;
      current = current.next;
    }
    return result;
  }

  // Stop when we wrap back to head (do not follow forever).
  *[Symbol.iterator]() {
    if (this.head === null) return;
    let current = this.head;
    do {
      yield current.value;
      current = current.next;
    } while (current !== this.head);
  }
}

// Usage

const list = new CircularList();
list.prepend(1);
list.prepend(2);
list.prepend(3);

//         ┌──────────────────────┐
//         ▼                      │
//       ┌───┐    ┌───┐    ┌───┐  │
// head─▶│ 3 │───▶│ 2 │───▶│ 1 │──┘
//       └───┘    └───┘    └───┘

console.log(`list.toArray() ->`, list.toArray());
console.log(`list.toArray(1) ->`, list.toArray(1));
console.log(`list.at(1) ->`, list.at(1));
console.log(`[...list] ->`, [...list]);

list.append(0);
console.log(`after append(0) ->`, list.toArray());

list.insert(1, 4);
console.log(`after insert(1, 4) ->`, list.toArray());

list.delete(2);
console.log(`after delete(2) ->`, list.toArray());
console.log(`toArray(2) wrap ->`, list.toArray(2));
