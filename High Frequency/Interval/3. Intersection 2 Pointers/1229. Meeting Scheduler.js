/**
 * Given the availability time slots arrays slots1 and slots2 of two people 
 * and a meeting duration duration, return the earliest time slot that works 
 * for both of them and is of duration duration.
 * If there is no common time slot that satisfies the requirements, return an empty array.
 */
console.log(minAvailableDuration([[10,50],[60,120],[140,210]], [[0,15],[60,70]], 8)); // [60, 68]
console.log(minAvailableDuration([[10,50],[60,120],[140,210]], [[0,15],[60,70]], 12)); // []
/**
 * @param {number[][]} slots1
 * @param {number[][]} slots2
 * @param {number} duration
 * @return {number[]}
 */
function minAvailableDuration(slots1, slots2, duration) {
  if (slots1.length === 0 || slots2.length === 0 || duration === 0) return [];
  slots1.sort((a, b) => a[0] - b[0]);
  slots2.sort((a, b) => a[0] - b[0]);
  let i = 0, j = 0;
  while (i < slots1.length && j < slots2.length) {
    const [a_start, a_end] = slots1[i],
          [b_start, b_end] = slots2[j];
    if (a_start <= b_end && a_end >= b_start) { // intersection
      const start = Math.max(a_start, b_start),
            end = Math.min(a_end, b_end);
      if (end-start >= duration) return [start, start+duration];
    }
    // move pointers for intersection or no intersection by smaller end time
    if (a_end < b_end) i++;
    else j++;
  }
  return []
};