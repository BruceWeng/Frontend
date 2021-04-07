/**
 * @param {HTMLElement} root
 * @param {HTMLElement} target
 * @return {HTMLElemnt | null}
 */
function nextRightSibling(root, target) {
  const queue = [root];
  while(queue.length!==0) {
    let size = queue.length;
    while(size>0) {
      const node = queue.shift();
      if(node===target && size===1) return null
      if(node===target) return queue.shift();
      queue.push(...node.children);
      size--;
    }
  }
}