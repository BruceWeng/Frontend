/**
 * @param {number[]} arr
 */
function selectionSort(arr) {
  // your code here
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    [ arr[min], arr[i] ] = [ arr[i], arr[min] ];
  }
}