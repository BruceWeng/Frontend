/**
 * @param {object} source
 * @param {string | string[]} path
 * @param {any} [defaultValue]
 * @return {any}
 */
function get(source, path, defaultValue = undefined) {
  // Convert path string into path array
  // ex: a.b.c[2] -> ['a', 'b', 'c', '2']
  // \d: Matches any digit (Arabic numeral). Equivalent to [0-9].
  // +: Matches the preceding item "x" 1 or more times. Equivalent to {1,}. For example, /a+/ matches the "a" in "candy" and all the "a"'s in "caaaaaaandy".
  // $n: For example, if /(\a+)(\b+)/, was given, $1 is the match for \a+, and $2 for \b+.
  const segs = Array.isArray(path) ? path : path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let index = 0;
  let result = source[segs[index]];
  while (result && segs.length - 1 > index) {
    index++;
    result = result[segs[index]];
  }
  return result || defaultValue;
}