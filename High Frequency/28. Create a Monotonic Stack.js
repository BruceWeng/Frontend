// find Next: update result inside while loop
// find Previous: update result outside while loop
// find Greater Element: Decreasing stack
// find Less Element: Increasing stack
const target = [3, 5, 11, 17, 7, 13];

// Decreasing stack: find Next Greater Element
function nextGreaterElement(target) {
  if (target == null 
    || Array.isArray(target) === false
    || target.some((e) => typeof e !== 'number')) 
    return new TypeError('Invalid input');
    if (target.length === 0) return [];
    
    const stack = [];
    const result = new Array(target.length).fill(-1);
    for (let i = 0; i < target.length; i++) {
      while (stack.length !== 0 && target[stack[stack.length-1]] < target[i]) {
        result[stack.pop()] = target[i];
      }
      stack.push(i);
    }
    return result;
  }
  
console.log(nextGreaterElement()); // TypeError
console.log(nextGreaterElement(['a'])); // TypeError
console.log(nextGreaterElement([])); // []
console.log(nextGreaterElement(target)); // [ 5, 11, 17, -1, 13, -1 ]

// Increasing stack: find Next Less Element
function nextLessElement(target) {
  const stack = [];
  const result = new Array(target.length).fill(-1);
  for (let i = 0; i < target.length; i++) {
    while (stack.length !== 0 && target[stack[stack.length-1]] > target[i]) {
      result[stack.pop()] = target[i];
    }
    stack.push(i);
  }
  return result;
}
// const target = [3, 5, 11, 17, 7, 13];
console.log(nextLessElement(target)); // [ -1, -1, 7, 7, -1, -1 ]

// Decreasing stack: find Previous Greater Element
function prevGreaterElement(target) {
  const stack = [];
  const result = new Array(target.length).fill(-1);
  for (let i = 0; i < target.length; i++) {
    while (stack.length !== 0 && target[stack[stack.length-1]] < target[i]) {
      stack.pop();
    }
    if (stack.length !== 0) result[i] = target[stack[stack.length-1]];
    stack.push(i);
  }
  return result;
}
// const target = [3, 5, 11, 17, 7, 13];
console.log(prevGreaterElement(target)); // [ -1, -1, -1, -1, 17, 17 ]

// Increasing stack: find Previous Less Element
function prevLessElement(target) {
  const stack = [];
  const result = new Array(target.length).fill(-1);
  for (let i = 0; i < target.length; i++) {
    while (stack.length !== 0 && target[stack[stack.length-1]] > target[i]) {
      stack.pop();
    }
    if (stack.length !== 0) result[i] = target[stack[stack.length-1]];
    stack.push(i);
  }
  return result;
}
// const target = [3, 5, 11, 17, 7, 13];
console.log(prevLessElement(target)); // [-1, 3, 5, 11, 5, 7]