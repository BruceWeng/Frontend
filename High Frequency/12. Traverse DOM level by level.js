/**
 * @param { HTMLElement } root
 * @returns { HTMLElement[] }
 */
function flatten(root) {
  // your code here
  if (root === null) return [];
  const result = [];
  const queue = [root];
  while (queue.length !== 0) {
    let size = queue.length;
    while (size > 0) {
      const node = queue.shift();
      result.push(node);
      queue.push(...node.children);
      size--;
    }
  }
  return result;
}