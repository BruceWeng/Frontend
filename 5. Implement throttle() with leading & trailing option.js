/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 */
function throttle(func, wait, option = {leading: true, trailing: true}) {
  if (!option.leading && !option.trailing) return () => null;
  let waiting = false;
  let lastArgs;
  let timeoutId = null;
  const timeoutFn = (context) => {
    timeoutId = setTimeout(() => {
      if (option.trailing && lastArgs) {
        func.apply(context, lastArgs);
        lastArgs = null;
        if (timeoutId) timeoutId = null;
        timeoutFn(context)
      } else {
        waiting = false;
      }
    }, wait);
  };

  return function () {
    if (!waiting) {
      waiting = true;
      if (option.leading) func.apply(this, arguments);
      timeoutFn(this);
    } else {
      lastArgs = [...arguments];
    }
  }
}