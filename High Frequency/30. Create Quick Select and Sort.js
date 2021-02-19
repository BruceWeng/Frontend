const nums = [1, 5, 2, 4, 6, 2];
console.log(findKehLargest(nums, 3)); // 4
console.log(findKehLargest(nums, 4)); // 2
console.log(quickSort(nums)); // [1,2,2,4,5,6]

function partition(nums, pivot, left, right) {
  let pivotValue = nums[pivot];
  let partitionIndex = left;
  for (let i = left; i < right; i++) {
    if (nums[i] < pivotValue) {
      swap(nums, i, partitionIndex);
      partitionIndex++;
    }
  }
  swap(nums, pivot, partitionIndex);
  return partitionIndex;
};

function swap(nums, a, b) {
  [ nums[a], nums[b] ] = [ nums[b], nums[a] ];
};

function shuffle(nums) {
  if (nums.length < 2) return nums;
  for (let j = 1; j < nums.length; j++) {
    let i = Math.floor(Math.random() * (j+1));
    swap(nums, i, j);
  }
  return nums;
}

function findKehLargest(nums, k) {
  nums = shuffle(nums);
  let kth = nums.length-k;
  let left = 0;
  let right = nums.length-1;
  while (left <= right) {
    let pivot = right;
    let partitionIndex = partition(nums, pivot, left, right);
    if (partitionIndex === kth) break;
    if (partitionIndex < kth) left = partitionIndex+1;
    if (partitionIndex > kth) right = partitionIndex-1
  }
  return nums[kth];
};

function quickSort(nums, left=0, right=nums.length-1) {
  if (nums.length < 2) return nums;
  if (right - left === nums.length-1) nums = shuffle(nums); // shuffle initial nums so that worst T: O(nlogn)
  if (left < right) {
    let pivot = right;
    let partitionIndex = partition(nums, pivot, left, right); 
    quickSort(nums, left, partitionIndex-1);
    quickSort(nums, partitionIndex+1, right);
  }
  return nums;
}