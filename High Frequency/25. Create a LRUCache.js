class ListNode {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

// Create DLList per cache
class LRUCache {
  constructor(capacity) {
    this.head = new ListNode(-1, -1);
    this.tail = new ListNode(-1, -1);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
    this.capacity = capacity;
    this.map = {};
  }

  get(key) {
    const node = this.map[key];
    if (node !== undefined) {
      this.moveToHead(node);
      return node.val;
    }
    return -1;
  }

  put(key, value) {
    let node = this.map[key];
    if (node !== undefined) {
      node.val = value;
      this.moveToHead(node);
    } else {
      node = new ListNode(key, value);
      this.attachToHead(node);
      this.size++;
    }

    if (this.size > this.capacity) {
      this.removeLast();
      this.size--;
    }
    this.map[key] = node;
  }

  // Utility funcs
  // called when set a new (key, value) pair
  attachToHead(node) {
    node.next = this.head.next;
    node.next.prev = node;
    this.head.next = node;
    node.prev = this.head;
  }

  // called everytime node is touched
  moveToHead(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.attachToHead(node);
  }

  // called when cache over capacity in set()
  removeLast() {
    const last = this.tail.prev;
    last.prev.next = this.tail;
    this.tail.prev = last.prev;
    delete this.map[last.key];
  }
}

let cache = new LRUCache(4);
cache.put(10, 13);
cache.put(3, 17);
cache.put(6, 11);
cache.put(10, 5);
cache.put(9, 10);
console.log(cache.get(3)); // 17
cache.put(2, 19);
console.log(cache.get(2)); // 19
console.log(cache.get(6)); // -1