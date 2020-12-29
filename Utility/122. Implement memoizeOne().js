/**
 * @param {Function} func
 * @param {(args: any[], newArgs: any[]) => boolean} [isEqual]
 * @returns {any}
 */
function memoizeOne(func, isEqual) {
  isEqual = isEqual || ((a, b) => a.every((arg, i) => arg === b[i]));
  let cachedArgs;
  let cachedResult;
  let cachedContext;
  return function (...args) {
    if (cachedArgs === undefined || !isEqual.call(this, args, cachedArgs) || cachedContext !== this) {
      cachedArgs = args;
      cachedContext = this;
      cachedResult = func.apply(this, args);
    }
    return cachedResult;
  }
}