/**
 * @param {number[]} arr
 */
function insertionSort(arr) {
  // your code here
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j-1]) {
        [ arr[j], arr[j-1] ] = [ arr[j-1], arr[j] ];
      }
    }
  }
}