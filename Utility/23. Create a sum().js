/**
 * @param {number} num
 */
function sum(num) {
  function partialSum(nextNum) {
    return nextNum ? sum(num + nextNum) : num;
  }
  /*
    In order to get the result of sum(1)(2)(3)...(N), there are 2 options:
    1. Put an empty parantheses at the end - sum(1)(2)(3)() (Preferred in a real world scenario)
    2. Use sum(1)(2)(3).valueOf() (Used for testing the solution of this problem)
  */
  partialSum.valueOf = () => num;
  return partialSum;
}