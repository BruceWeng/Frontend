/**
 * Implement your own myCall, which returns the same result as Function.prototype.call
 * function mycall(obj, ...args): execution return
 * @param {object} context 
 * @param  {...any} args 
 */
Function.prototype.mycall = function(context, ...args) {
  // 7 Steps:
  // context = context || {}; // in nodejs
  context ??= window; // 1.context can be empty (if context = null, undefined, false, context = window)
  context = Object(context); // 2.transform primitive value
  let func = Symbol(); // 3.create a unique property 
  context[func] = this; // 4.assign 'this' (the function) to a unique method created on the context
  let result = context[func](...args) // 5.call the method with passed args
  delete context[func]; // 6.delete this unique method so as to not cause any sideeffects
  return result; // 7.return result
}

function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.mycall(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);
// expected output: "cheese"
