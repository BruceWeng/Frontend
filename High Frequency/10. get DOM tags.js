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
  for(let child of tree.children) visit(child, set);
}

// Iteration solution:DFS
/**
 * @param {HTMLElement} tree
 * @return {string[]}
 */
function getTags(tree) {
  const set = new Set()
  const stack = [tree]
  while(stack.length>0) {
    const top = stack.pop()
    set.add(top.tagName.toLowerCase())
    stack.push(...top.children)
  }
  return [...set]
}

// BFS
function getTags(tree) {
  // your code here
  if(tree===null) return [];
  const set = new Set();
  const queue = [tree];
  while(queue.length!==0) {
    let size = queue.length;
    while(size>0) {
      let node = queue.shift();
      set.add(node.tagName.toLowerCase());
      queue.push(...node.children);
      size--;
    }
   }
  return [...set];
}