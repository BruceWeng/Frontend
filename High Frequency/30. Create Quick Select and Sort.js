const nums = [1, 5, 2, 4, 6, 2];
console.log(findKehLargest(nums, 3)); // 4
console.log(findKehLargest(nums, 4)); // 2
console.log(quickSort(nums)); // [1,2,2,4,5,6]

function partition(nums, pivot, left, right) {
  let pivot_value = nums[pivot];
  let partition_index = left;
  for(let i=left; i<right; i++) {
    if(nums[i]<pivot_value) {
      swap(nums, i, partition_index);
      partition_index++;
    }
  }
  swap(nums, partition_index, pivot);
  return partition_index;
};

function swap(nums, a, b) {
  [ nums[a], nums[b] ] = [ nums[b], nums[a] ];
};

function shuffle(nums) {
  if(nums.length<2) return nums;
  for(let i=nums.length-1; i>0; i--) {
    swap(nums, i, Math.floor(Math.random()*(i+1)));
  }
  return nums;
}

function findKehLargest(nums, k) {
  if(nums.length===0) return;
  nums = shuffle(nums);
  const kth = nums.length-k;
  let left = 0;
  let right = nums.length-1;
  while(left<=right) {
    let pivot = right;
    let partition_index = partition(nums, pivot, left, right);
    if(partition_index===kth) break;
    if(partition_index<kth) left = partition_index+1;
    if(partition_index>kth) right = partition_index-1;
  }
  return nums[kth];
};

function quickSort(nums, left=0, right=nums.length-1) {
  if(nums.length<2) return nums;
  if(right-left===nums.length-1) nums = shuffle(nums); // shuffle initial nums so that worst T: O(nlogn)
  if(left<right) {
    let pivot = right;
    let partition_index = partition(nums, pivot, left, right); 
    quickSort(nums, left, partition_index-1);
    quickSort(nums, partition_index+1, right);
  }
  return nums;
}