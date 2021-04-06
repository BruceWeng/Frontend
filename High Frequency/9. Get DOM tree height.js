/**
 * @param {HTMLElement | null} tree
 * @return {number}
 */
function getHeight(tree) {
  if(tree===null) return 0;
  let maxHeight = 0;
  for(let child of tree.children) {
    maxHeight = Math.max(maxHeight, getHeight(child));
  }
  return 1+maxHeight;
}

// Iteration solution
/**
 * @param {HTMLElement | null} tree
 * @returns {number}
 */
function getHeight(tree) {
  if(tree===null) return 0;
  let height = 0;
  const q = [tree];
  while(q.length>0) {
    let size = q.length;
    height++;
    while(size>0) {
      const head = q.shift()
      q.push(...head.children)
      size--;
    }
  }
  return height;
}
// 2021/02/09
/**
 * @param {HTMLElement | null} tree
 * @return {number}
 */
function getHeight(tree) {
  // your code here         
  if(tree===null) return 0;
  if(tree.children.length===0) return 1;
  return Math.max(...[...tree.children].map((item) => getHeight(item)))+1;
}