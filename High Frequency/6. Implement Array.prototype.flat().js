/**
  [
    [1,1], 
    [[2],1], 
    [[3, [4]],1]
  ]
*/
console.log(flat([[1,1], [[2],1], [[3, [4]],1]], 1)); // [1, 1, [2], 1, [3, [4]], 1]
console.log(flat([[1,1], [[2],1], [[3, [4]],1]], Infinity)); // [1, 1, 2, 1, 3, 4, 1]
/**
 * @param {Array} arr
 * @param {number} depth
 */
// Iteration
function flat(arr, depth=1) {
  const result = [];
  const stack = [...arr.map(item => [item, depth])];
  while (stack.length !== 0) {
    const [current, depth] = stack.pop(); // current = array | number
    if (Array.isArray(current) && depth > 0) {
      stack.push(...current.map(item => [item, depth-1]));
    } else {
      result.push(current);
    }
  }
  return result.reverse();
}

// Recursion
function flat(arr, depth=1) {
  let result = [];
  if (arr.length === 0) return result;
  for (const current of arr) {
    if (Array.isArray(current) && depth > 0) {
      result = [...result, ...flat(current, depth-1)];
    } else {
      result.push(current);
    }
  }
  return result;
}
