/**
 * Write a function myBind(obj, args): Function
 * Receive obj and apply args to func with obj.
 */
const obj = {
  name: 'John',
  state: 'CA'
}

function profile(times) {
  for (let i = 0; i < times; i++) {
    console.log(`${this.name} from ${this.state}`);
  }
}

function sum(a, b) {
  return a + b;
}

Function.prototype.myBind = function() {
  let func = this;
  let context = arguments[0];
  let params = Object.values(arguments).slice(1);
  return (...args) => {
    return func.apply(context, [...args, ...params]);
  };
}

const loopProfile = profile.myBind(obj);
loopProfile(3); // John from CA * 3

const plusOne = sum.myBind(null, 1);
console.log(plusOne(2)); // 3