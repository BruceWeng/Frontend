/**
 * Given a collection of intervals, find the minimum number of intervals you need to remove 
 * to make the rest of the intervals non-overlapping.
 */
console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // 1 
// [1,3] can be removed and the rest of intervals are non-overlapping.
console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]])); // 2
console.log(eraseOverlapIntervals([[1,2],[2,3]])); // 0
// the problem is the same as "Given a collection of intervals, 
// find the maximum number of intervals that are non-overlapping." (the classic Greedy problem: Interval Scheduling).

// If Sort by start: 
// If there is one interval [0,24], will be the first interval after sorting and must be chosen.
// And there are no other intervals can be chosen. It can't be maximum number of intervals.
/**
 * @param {number[][]} intervals
 * @return {number}
 */
function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) return 0;
  intervals.sort((a, b) => a[1] - b[1]); // sorted by end
  let count = 1; // maximum non-overlapping interval counts.
  let end = intervals[0][1];
  // choose only when next interval does not overlap to last selected one.
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= end) {
      end = intervals[i][1];
      count++;
    }
  }
  return intervals.length - count;  
};

/**
 * Proof of Sort by End method of (Maximum intervals that are non-overlapping):
 * 1. Let Greedy solution G = [a1...am]
 * 2. Let Optimal solytion O = [b1...bn]
 * 3. n >= m
 * 4. Let k be first different interval
 *    G = [a1...ak-1,ak...am]
 *    O = [a1...ak-1,bk...bn]
 *    ak.end <= bk.end because G was sorted by end time
 * 5. Replace bk by ak only make O better, let's do it until am
 *    O = [a1...am, bm+1...bn]
 * 6. If bm+1...bn exist, greedy solution will find them by select next earliest end time interval. 
 *    They should not exist.
 * 7. Greedy solution is the optimal solution.
 */