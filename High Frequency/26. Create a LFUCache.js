class ListNode {
  constructor(key, val, freq) {
    this.key = key;
    this.val = val;
    this.freq = freq;
    this.prev = null;
    this.next = null;
  }
}

class DLList {
  constructor(freq) {
    this.head = new ListNode(-1, -1, freq);
    this.tail = new ListNode(-1, -1, freq);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }

  attachToHead(node) {
    node.next = this.head.next;
    node.next.prev = node;
    this.head.next = node;
    node.prev = this.head;
    this.size++;
  }

  isEmpty() {
    return this.size === 0;
  }

  delete(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.size--;
  }
  /**
   * @return {number | null}
   */
  removeLast() {
    if (this.size === 0) return null;
    const node = this.tail.prev;
    this.delete(node);
    return node;
  }
}

// Create DLList per freq
class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.min_freq = 1;
    this.key_map = {}; // <key, ListNode>
    this.freq_map = {}; // <freq, DLList>
    this.freq_map[1] = new DLList(1);
  }

  // Utility
  /**
   * 
   * @param {number} node 
   * @return {number}
   */
  update(node) {
    const freq = node.freq;
    this.freq_map[freq].delete(node);
    if (freq === this.min_freq 
      && this.freq_map[freq].isEmpty()) 
      this.min_freq++;

    node.freq++;
    if (this.freq_map[node.freq] === undefined) {
      const new_list = new DLList(node.freq);
      new_list.attachToHead(node);
      this.freq_map[node.freq] = new_list;
    } else {
      this.freq_map[node.freq].attachToHead(node);
    }
    return node.val;
  }

  /** 
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (this.key_map[key] === undefined) return -1;
    const node = this.key_map[key];
    return this.update(node);
  }

  /** 
   * @param {number} key 
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.capacity === 0) return;
    if (key in this.key_map) {
      const node = this.key_map[key];
      node.val = value;
      this.update(node);
      return;
    }

    // if key not in key_map
    // 1. remove least freq node
    if (this.size === this.capacity) {
      const old_node = this.freq_map[this.min_freq].removeLast();
      delete this.key_map[old_node.key];
      this.size--;
    }
    // 2. create new ListNode for new key
    const node = new ListNode(key, value, 1);
    this.size++;
    this.min_freq = 1;
    this.key_map[key] = node;
    this.freq_map[1].attachToHead(node);
  }
}

// cnt(x) = the use counter for key x
// cache=[] will show the last used order for tiebreakers (leftmost element is  most recent)
const lfu = new LFUCache(2);
lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
console.log(lfu.get(1));      // return 1
                 // cache=[1,2], cnt(2)=1, cnt(1)=2
lfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.
                 // cache=[3,1], cnt(3)=1, cnt(1)=2
console.log(lfu.get(2));      // return -1 (not found)
console.log(lfu.get(3));      // return 3
                 // cache=[3,1], cnt(3)=2, cnt(1)=2
lfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.
                 // cache=[4,3], cnt(4)=1, cnt(3)=2
console.log(lfu.get(1));      // return -1 (not found)
console.log(lfu.get(3));      // return 3
                 // cache=[3,4], cnt(4)=1, cnt(3)=3
console.log(lfu.get(4));      // return 4
                 // cache=[3,4], cnt(4)=2, cnt(3)=3