/**
 * @param {HTMLElement} root
 * @param {(el: HTMLElement) => boolean} predicate
 * @param {(e: Event) => void} handler
 */
function onClick(root, predicate, handler) {
  // your code here
  if (root === undefined) return;
  const children = root.children;
  for (const child of children) {
    if (predicate(child)) {
      child.addEventListener('click', handler);
    }
    onClick(child, predicate, handler);
  }
}