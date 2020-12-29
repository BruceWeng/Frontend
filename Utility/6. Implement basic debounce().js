/**
 * @param {Function} func
 * @param {number} wait
 */
function debounce(func, wait) {
  let id;
  return function (...args) {
    const that = this;
    if (id) clearTimeout(id);
    id = setTimeout(() => {
      func.apply(that, args);
    }, wait);
  }
}