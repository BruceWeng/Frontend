/**
 * Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).
 * You may assume that the intervals were initially sorted according to their start times.
 */
console.log(insert([[1,3],[6,9]], [2,5])); // [[1,5],[6,9]]
console.log(insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8])); // [[1,2],[3,10],[12,16]]
console.log(insert([], [5,7])); // [[5,7]]
console.log(insert([[1,5]], [2,3])); // [[1,5]]
console.log(insert([[1,5]], [2,7])); // [[1,7]]

// 1. find all the left intervals
// 2. find all the right intervals
// 3. find merged interval start(smallest) and end(largest)
function insert (intervals, newInterval) {
  let left = [],
      right = [];
  let start = newInterval[0],
      end = newInterval[1];
  for (let i = 0; i < intervals.length; i += 1) {
    [left, right, start, end] = nextRange({intervals, left, right, start, end, i})
  }
  return [...left, [start, end], ...right];
}

function nextRange({intervals, left, right, start, end, i}) {
  if (intervals[i][1] < start) {
    left.push(intervals[i])
    return [left, right, start, end]
  }
  if (intervals[i][0] > end) {
    right.push(intervals[i])
    return [left, right, start, end]
  }
  return [left, right, Math.min(start, intervals[i][0]), Math.max(end, intervals[i][1])]
}