/**
 * Let inpunts be [start, end] corrdinates of the balloons, find minimum arrow used to burst all balloons.
 */
console.log(findMinArrowShots([[10,16],[2,8],[1,6],[7,12]])); // 2
// One way is to shoot one arrow for example at x = 6 (bursting the balloons [2,8] and [1,6]) 
// and another arrow at x = 11 (bursting the other two balloons).
console.log(findMinArrowShots([[1,2],[3,4],[5,6],[7,8]])); // 4
console.log(findMinArrowShots([[1,2],[2,3],[3,4],[4,5]]));  // 2
console.log(findMinArrowShots([[1,2]])); // 1
console.log(findMinArrowShots([[2,3],[2,3]])); // 1
/**
 * Similar to maximum interval scheduling problem: sort by end time 
 * because can not let [min,max] case cover other intervals.
 */
/**
 * @param {number[][]} points
 * @return {number}
 */
function findMinArrowShots(points) {
  if (points.length === 0) return 0;
  points.sort((a, b) => a[1] - b[1]);
  let count = 1;
  let end = points[0][1];
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > end) {
      end = points[i][1];
      count++;
    }
  }
  return count;
};