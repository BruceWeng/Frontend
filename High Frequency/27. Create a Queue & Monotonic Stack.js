class Q {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  peek() {
    return this.head;
  }

  enqueue(node) {
    const new_node = { node, next: null };
    if (this.head === null) this.head = this.tail = new_node;
    else {
      this.tail.next = new_node;
      this.tail = new_node;
    }
    this.size++;
    return this.size;
  }

  dequeue() {
    if (this.head === null) return null;
    const current = this.head;
    this.head = this.head.next;
    this.size--;
    return current.node;
  }
}

const target = [3, 5, 7, 11, 13];

// Increasing stack
const stack = [];
for (i = 0; i < target.length; i++) {
  while (stack.length !== 0 && stack[stack.length-1] > target[i]) {
    stack.pop();
    // update result
  }
  stack.push(target[i]);
  // update result
}