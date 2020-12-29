/**
 * @param {Function} func
 * @return {Function}
 */
function once(func) {
  let map = new Map();
  return function(...args) {
    if (map.has(func)) {
      return map.get(func);
    }
    let result = func.apply(this, args);
    map.set(func, result);
    return result;
  }
}