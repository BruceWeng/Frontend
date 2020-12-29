/**
 * @param {number[]} arr
 */
function quickSort(arr) {
  // your code here
  if (arr.length < 2) return;
  const result = sortHelper(arr, 0, arr.length - 1);
  for (let i = 0; i < arr.length; i++) { arr[i] = result[i]; }
};

function sortHelper(nums, start, end) {
  if (start < end) {
    let partition_index = partition(nums, start, end);
    sortHelper(nums, start, partition_index - 1);
    sortHelper(nums, partition_index + 1, end);
  }
  return nums;
}

const partition = (nums, start, end) => {
  let pivot_value = nums[end];
  let partition_index = start;
  for (let i = start; i <= end; i += 1) {
    if (nums[i] < pivot_value) {
      swap(nums, i, partition_index);
      partition_index += 1;
    }
  }
  swap(nums, end, partition_index);
  return partition_index;
};

const swap = (nums, i, j) => {
  [ nums[i], nums[j] ] = [ nums[j], nums[i] ];
};