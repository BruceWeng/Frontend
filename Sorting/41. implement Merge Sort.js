/**
 * @param {number[]} arr
 */
function mergeSort(arr) {
  // your code here
  const result = divide(arr);
  for (let i = 0; i < arr.length; i++) arr[i] = result[i];
}

function merge(nums1, nums2) {
  let merged = [];
  let ptr1 = 0;
  let ptr2 = 0;
  while (ptr1 < nums1.length && ptr2 < nums2.length) {
    if (nums1[ptr1] < nums2[ptr2]) merged.push(nums1[ptr1++]);
    else merged.push(nums2[ptr2++]);
  }
  
  merged.push(...nums1.slice(ptr1), ...nums2.slice(ptr2));
  return merged;
};

function divide(nums) {
  if (nums.length < 2) return nums;
  let mid = Math.floor(nums.length / 2);
  return merge(divide(nums.slice(0, mid)), divide(nums.slice(mid)));
};