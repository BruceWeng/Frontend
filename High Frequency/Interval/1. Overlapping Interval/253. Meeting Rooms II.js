/**
 * Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], 
 * return the minimum number of conference rooms required.
 */
console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // 2
console.log(minMeetingRooms([[7,10],[2,4]])); // 1
// 1. Sort by start
// 2. if nextInterval.start < prevInterval.end: increment room count
// 3. should not compare prevInterval.end but smallest end of eash used room
// 4. Use sorted start array and sorted end array instead of intervals.
/**
 * @param {number[][]} intervals
 * @return {number}
 */
function minMeetingRooms(intervals) {
  const starts = [];
  const ends = [];
  for (const interval of intervals) {
    starts.push(interval[0]);
    ends.push(interval[1]);
  }
  starts.sort((a, b) => a - b);
  ends.sort((a, b) => a - b);
  let rooms = 0;
  let min_end_of_rooms_index = 0;
  for (let i = 0; i < intervals.length; i++) {
    if (starts[i] < ends[min_end_of_rooms_index]) rooms++;
    else min_end_of_rooms_index++; 
  }
  return rooms;
};