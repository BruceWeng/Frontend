/**
Given a collection of intervals, merge all overlapping intervals.

Example 1:
Input: [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].

Example 2:
Input: [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 */
console.log(merge([[1,3],[2,6],[8,10],[15,18]])); // [[1,6],[8,10],[15,18]]
console.log(merge([[1,4],[4,5]])); // [[1,5]]
/**
 * Leetcode Fundamental: 12/7 Update, 2020/9/27 Update
 * 
 * Greedy Solution
 * 
 * T: O(NlogN)
 * S: O(N)
 * Runtime: 76 ms
 */
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if (intervals === undefined || intervals.length === 0) return [];
  let result = [];
  intervals.sort((a, b) => a[0] - b[0]); // merge problem, global minimum start time matter, need to sort by start time.
  let prevInterval = intervals[0];
  for (let i = 1; i < intervals.length; i++) {
    if (prevInterval[1] >= intervals[i][0]) {
      prevInterval[1] = Math.max(prevInterval[1], intervals[i][1]);
    }
    if (prevInterval[1] < intervals[i][0]) {      
      result.push(prevInterval);
      prevInterval = intervals[i];
    }
  }
  result.push(prevInterval);
  return result;
};
// Sort by start:
// case 1: [Astart......Aend]
//          [Bstart..Bend]
// case 2: [Astart..Aend]
//            [Bstart...Bend]
// case 3: [Astart..Bend]
//                        [Bstart..Bend]
// Merged interval are guarrented not affected by next interval.

// Sort by end:
// case 1:   [Astart...Aend]
//         [Bstart......Bend] in this case, merged interval are not gurrented to be not affected by next interval.
// case 2: [Astart..Aend]
//            [Bstart...Bend]
// case 3: [Astart..Bend]
//                        [Bstart..Bend]
// Sort by end won't work in this quesiton.

// Essentialliy we only need to compare case 1 to decide sort by start or end.