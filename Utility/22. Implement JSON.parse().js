/**
 * @param {string} str
 * @return {object | Array | string | number | boolean | null}
 */
function parse(str) {
  const ans = eval('(' + str + ')');
  if (str !== JSON.stringify(ans)) throw Error('Unexpected token');
  return ans;
}