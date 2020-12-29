/**
 * @param {HTMLElement} root
 * @param {HTMLElement} target
 * @return {HTMLElemnt | null}
 */
function nextRightSibling(root, target) {
  if (root === null) {
    return null;
  }
  const queue = [root, null];
  while (queue.length > 0) {
    const node = queue.shift();
    if (node === target) {
      return queue.shift();
    } else if (node === null && queue.length !== 0) {
      queue.push(null);
    } else {
      queue.push(...node.children);
    }
  }
  return null;
}