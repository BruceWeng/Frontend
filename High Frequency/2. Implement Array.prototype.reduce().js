/**
 * Write a function reduce(func: function, initialState: any): any
 * behaves the same as Array.prototype.reduce().
 */
Array.prototype.myreduce = function(func, initialValue) {
  let result = initialValue;
  for(const current of this) { // 'this' is the array calls myreduce
    result = func(result, current);
  }
  return result;
}

let initialValue = 0
let sum = [{x: 1}, {x: 2}, {x: 3}].myreduce(
    (accumulator, currentValue) => accumulator + currentValue.x
    , initialValue
)

console.log(sum) // 6
