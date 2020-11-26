class NodeStore {
  constructor() {
    this.nodes = {};
  }
  /**
   * @param {Node} node
   * @param {any} value
   */
  set(node, value) {
    node.__nodeStoreKey__ = Symbol();
    this.nodes[node.__nodeStoreKey__] = value;
  }
  /**
   * @param {Node} node
   * @return {any}
   */
  get(node) {
    return this.nodes[node.__nodeStoreKey__];
  }

  /**
   * @param {Node} node
   * @return {Boolean}
   */
  has(node) {
    return Boolean(this.nodes[node.__nodeStoreKey__]);
  }
}