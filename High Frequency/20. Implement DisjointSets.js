class DisjointSets {
  constructor(n) {
    this.parents = new Array(n).fill().map((_, i) => i); // [0...n-1]
    this.ranks = new Array(n).fill(0);
  }

  /**
   * Find a and set a's parent to root of the set
   * (path compression, reduce height while find)
   * @param {number} a 
   * @return {number}
   */
  find(a) {
    while (this.parents[a] !== a) a = this.parents[a];
    return a;
  }

  /**
   * If a and b are connected, return true, else return false 
   * (reduce path compression overhead by union by ranks)
   * @param {number} a 
   * @param {number} b 
   * @return {boolean}
   */
  union(a, b) {
    const parent_a = this.find(a);
    const parent_b = this.find(b);
    
    if (parent_a === parent_b) return true;
    
    if (this.ranks[parent_a] > this.ranks[parent_b]) this.parents[parent_b] = parent_a;
    if (this.ranks[parent_b] > this.ranks[parent_a]) this.parents[parent_a] = parent_b;
    if (this.ranks[parent_a] === this.ranks[parent_b]) {
      this.parents[parent_b] = parent_a;
      this.ranks[parent_a]++;
    }
    return false;
  }
}
// 1. Rank is bounded [0...logN]
// 2. T: < O(NlogN) make set by union