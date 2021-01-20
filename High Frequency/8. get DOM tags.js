/**
 * @param {HTMLElement} tree
 * @return {string[]}
 */
function getTags(tree) {
  const set = new Set();
  visit(tree, set);
  return [...set];
}

function visit(tree, set) {
  set.add(tree.tagName.toLowerCase());
  for (let child of tree.children) visit(child, set);
}

// Iteration solution
/**
 * @param {HTMLElement} tree
 * @return {string[]}
 */
function getTags(tree) {
  const set = new Set()
  const stack = [tree]
  while (stack.length > 0) {
    const top = stack.pop()
    set.add(top.tagName.toLowerCase())
    stack.push(...top.children)
  }
  return [...set]
}