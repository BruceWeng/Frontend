/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 */
function debounce(func, wait, option = {leading: false, trailing: true}) {
  if (!option.leading && !option.trailing) return () => null;
  let leading = option.leading;
  let trailing = option.trailing;
  let timeoutId;
  let lastArgs;

  const timeoutFn = (context) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (trailing && lastArgs) {
        func.apply(context, lastArgs);
        lastArgs = null;
      }
      if (option.leading) {
        leading = true;
      }
    }, wait);
  };

  return function (...args) {
    lastArgs = args;
    if (leading) {
      func.apply(this, args);
      lastArgs = null;
      leading = false;
    }
    timeoutFn(this);
  }
}