/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
function objectAssign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new Error('Not an object');
  }
  if (typeof target !== 'object') {
    target = new target.__proto__.constructor(target);
  }
  for (const source of sources) {
    if (source === null || source === undefined) {
      continue;
    }
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    for (const symbol of Object.getOwnPropertySymbols(source)) {
      target[symbol] = source[symbol];
    }
  }
  return target;
}