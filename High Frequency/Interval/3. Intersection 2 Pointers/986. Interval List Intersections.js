/**
 * You are given two lists of closed intervals, firstList and secondList, 
 * where firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. 
 * Each list of intervals is pairwise disjoint and in sorted order.
 * Return the intersection of these two interval lists.
 */
console.log(intervalIntersection([[0,2],[5,10],[13,23],[24,25]], [[1,5],[8,12],[15,24],[25,26]]));
// [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
console.log(intervalIntersection([[1,3],[5,9]], [])); // []
console.log(intervalIntersection([[1,7]], [[3, 10]])); // [[3,7]]
 /**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
function intervalIntersection (firstList, secondList) {
  if (firstList.length === 0 || secondList.length === 0) return [];
  let i = 0, j = 0;
  const result = [];
  while (i < firstList.length && j < secondList.length) {
    const [a_start, a_end] = firstList[i];
    const [b_start, b_end] = secondList[j];
    if (a_start <= b_end && a_end >= b_start) // intersection
      result.push([Math.max(a_start, b_start), Math.min(a_end, b_end)]);
    // both intersection and no intersection
    // move the smaller interval.end interval to next interval
    if (a_end < b_end) i++;
    else j++;
  }
  return result;
};