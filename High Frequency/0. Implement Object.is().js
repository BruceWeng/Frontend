/**
 * Object.is() is similar to === except following cases
 * 
 * Object.is(0, -0) // false
 * 0 === -0 // true
 * 
 * Object.is(NaN, NaN) // true
 * NaN === NaN // false
 */

/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function is(a, b) {
  if(a===0 && b===0) return (1/a===1/b);
  if(Number.isNaN(a) && Number.isNaN(b)) return true;
  return a===b;
}