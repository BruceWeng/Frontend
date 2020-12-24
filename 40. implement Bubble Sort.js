/**
 * @param {number[]} arr
 */
function bubbleSort(arr) {
  // your code here
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length; j++) {
      if (arr[j] < arr[j-1]) {
        [ arr[j], arr[j-1] ] = [ arr[j-1], arr[j] ];
      }
    }
  }
}