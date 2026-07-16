# List

Linked lists step by step: cons cells, car/cdr, immutable classes, then mutable singly, doubly, and circular lists.

## Examples

- [1-cons.js](JavaScript/1-cons.js) — frozen `cons(value, next)` cells; several heads share one tail
- [2-access.js](JavaScript/2-access.js) — `first` / `rest` (car / cdr) and walk a list with `iterate`
- [3-list.js](JavaScript/3-list.js) — `list(...values)` builds a chain; iterate over it
- [4-class.js](JavaScript/4-class.js) — `ConsList` with private fields, `prepend`, `first`, `rest`, and iterator
- [5-mutable.js](JavaScript/5-mutable.js) — mutable singly linked `List` (`prepend`, `append`, `insert`, `delete`, `at`)
- [6-double.js](JavaScript/6-double.js) — mutable `DoubleList` with the same API; O(1) `append` via `tail`
- [7-circular.js](JavaScript/7-circular.js) — mutable `CircularList` with the same API; last `next` points to `head`

## Cons cells (1–3)

A list is either `null` (empty) or an immutable cell `{ value, next }`:

```js
const cons = (value, next = null) => Object.freeze({ value, next });

const first = (list) => list.value; // car / head
const rest = (list) => list.next; // cdr / tail
```

Branches can share the same tail without copying:

```text
  branch1   branch2   branch3
     │         │         │
     ▼         ▼         ▼
    [10]      [20]      [30]
     │         │         │
     └────┬────┴─────────┘
          ▼
         [3] → [2] → [1] → null
```

Immutable `prepend` is O(1): allocate one new cell that points at the old head.

## Immutable class (4)

`ConsList` keeps `#value`, `#next`, and `#size` private. `prepend` returns a new list; older versions stay unchanged.

```js
const three = empty.prepend(1).prepend(2).prepend(3);
const branch1 = three.prepend(10); // [10, 3, 2, 1]
```

## Mutable lists (5–7)

Same idea of a growing chain, but one instance is updated in place. Examples 5–7 share an API:

```text
prepend, append, insert, delete, at, toArray, [Symbol.iterator]
```

```js
const list = new List();
list.prepend(1);
list.prepend(2);
list.prepend(3); // [3, 2, 1]
list.append(0); // [3, 2, 1, 0]
```

| | `List` (5) | `DoubleList` (6) | `CircularList` (7) |
| --- | --- | --- | --- |
| Links | `next` | `prev` + `next` | `next` (ring) |
| End | `null` | `tail` pointer | last `next` → `head` |
| `append` | O(n) walk | O(1) via `tail` | O(n) to last |
| Index walk | from head | nearer of head/tail | from head |
| Extra | — | fast unlink with `prev` | `toArray(start)` wraps |

Singly linked (5):

```text
head → [3] → [2] → [1] → null
```

Doubly linked (6):

```text
head ⇄ [3] ⇄ [2] ⇄ [1] ⇄ tail
```

Circular (7):

```text
      ┌──────────────┐
      ▼              │
head → [3] → [2] → [1] ┘
```

## Complexity

Immutable cons list:

```text
prepend: O(1)
first:   O(1)
rest:    O(1)
iterate: O(n)
```

Mutable lists: `prepend` is O(1); `at` / `insert` / `delete` are O(n); `DoubleList.append` is O(1).

Prefer arrays when you need frequent indexed access, slice, or sort.
