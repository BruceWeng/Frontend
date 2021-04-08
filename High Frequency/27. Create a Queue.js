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
    if(this.head===null) this.head = this.tail = new_node;
    else {
      this.tail.next = new_node;
      this.tail = new_node;
    }
    this.size++;
    return this.size;
  }

  dequeue() {
    if(this.head===null) return null;
    const current = this.head;
    this.head = this.head.next;
    this.size--;
    return current.node;
  }
}

const queue = new Q();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.size); // 2
console.log(queue.dequeue()); // 1
console.log(queue.size); 1