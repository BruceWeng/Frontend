// Binary Search
console.log(search([3, 5, 7, 11, 13, 17, 19], 7)); // true
console.log(search([3, 5, 7, 11, 13, 17, 19], 6)); // false
console.log(lowerBound([3, 5, 7, 11, 13, 17, 19], 7)); // 11
console.log(lowerBound([3, 5, 7, 11, 13, 17, 19], 6)); // 7
console.log(lowerBound([3, 5, 7, 11, 13, 17, 19], 19)); // null

function search(space, target) {
  let left = 0, right = space.length - 1; // right = N - 1
  while (left <= right) { // left <= right
    let mid = left + ((right - left) >> 1);
    if (space[mid] === target) return true;
    if (space[mid] > target) right = mid - 1; // right = mid - 1
    else left = mid + 1;
  }
  return false;
}

function lowerBound(space, target) {
  let left = 0, right = space.length; // right = N
  while (left < right) { // left < right
    let mid = left + ((right - left) >> 1);
    if (space[mid] > target) right = mid;
    else left = mid + 1;
  }
  // space[left] here is the minimum value that greater than target
  if (left === space.length) return null;
  return space[left];
}