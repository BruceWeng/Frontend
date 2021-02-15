class PriorityQueue {
  constructor(compareFunc=(a, b) => a - b) { // min heap by default
    this.heap = [];
    this.compare = compareFunc;
    // Utility
    this.top = 0;
    this.parent = i => ((i + 1) >> 1) - 1; // for shiftUp
    this.left = i => (i << 1) + 1; // for shiftDown
    this.right = i => (i << 1) + 2; // for shiftDown
  }
  size() {
    return this.heap.length;
  }
  peek() {
    return this.heap[this.top];
  }
  add(...values) {
    values.forEach(value => {
      this.heap.push(value);
      this.siftUp(this.size()-1);
    });
    return this.size();
  }
  poll() {
    if (this.size() === 0) return;
    let root = this.heap[this.top];
    this.heap[this.top] = this.heap[this.size()-1];
    this.heap.pop();
    this.siftDown(this.top);
    return root;
  }
  // Helper functions
  more(a, b) {
    return this.compare(this.heap[a], this.heap[b]) < 0;
  }
  swap(a, b) {
    [ this.heap[a], this.heap[b] ] = [ this.heap[b], this.heap[a] ];
  }
  siftUp(index) {
    while (index > 0) {
      let parent_index = this.parent(index);
      if (this.more(parent_index, index)) break;
      this.swap(parent_index, index);
      index = parent_index;
    }
  }
  siftDown(index) {
    while (true) {
      let swap_index = null;
      let right_index = this.right(index);
      let left_index = this.left(index);

      if (left_index < this.size() 
        && this.more(left_index, index)) swap_index = left_index;

      if (right_index < this.size() 
        && this.more(right_index, index) 
        && this.more(right_index, left_index)) swap_index = right_index;

      if (swap_index === null) break;

      this.swap(swap_index, index);
      index = swap_index;
    }
  }
}
