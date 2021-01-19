/**
 * @param {Function} func
 */
function curry(func) {
  return function curried(...args) {
    // 1. if enough args, call func
    // 2. if not enough, bind the args and wait for new one

    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      // 1,2
      return curried.bind(this, ...args);
    }
  };
}
