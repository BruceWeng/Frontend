/**
 * @param {Function} func
 * @param {number} wait
 */
function throttle(func, wait) {
  let waiting = false;
  let lastArgs;
  return function () {
    if (!waiting) {
      waiting = true;
      func.apply(this, arguments);
      setTimeout(() => {
        waiting = false;
        if (lastArgs) func.apply(this, lastArgs);
      }, wait);
    } else {
      lastArgs = [...arguments];
    }
  }
}