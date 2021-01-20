/**
 * @param {Function} func
 */
function curry(func) {
  return function curried(...args) {
    // 1. if enough args, call func
    // 2. if not enough, bind the args and wait for new one

    if (args.length >= func.length) { // function.length return how many args it expects
      return func.apply(this, args); // execute func only when args.length >= func.length
    } else {
      // 1,2
      return curried.bind(this, ...args);
    }
  };
}

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
}

const curriedJoin = curry(join);

console.log(curriedJoin(1, 2, 3)); // '1_2_3'

console.log(curriedJoin(1)(2, 3)); // '1_2_3'

console.log(curriedJoin(1, 2)(3)); // '1_2_3'

console.log(curriedJoin(1, 2, 3, 4)); // '1_2_3'