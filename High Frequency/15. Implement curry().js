// 1. if enough args, call func
// 2. if not enough, bind the args and wait for new one
/**
 * @param {Function} func
 */
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) { // function.length return how many args it expects
      // 1
      return func.call(this, ...args); // return value
    } else {
      // 2
      return curried.bind(this, ...args); // return function
    }
  };
}

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
}

const curriedJoin = curry(join);

console.log(curriedJoin(1)(2)(3)); // '1_2_3'

console.log(curriedJoin(1, 2, 3)); // '1_2_3'

console.log(curriedJoin(1)(2, 3)); // '1_2_3'

console.log(curriedJoin(1, 2)(3)); // '1_2_3'

console.log(curriedJoin(1, 2, 3, 4)); // '1_2_3'