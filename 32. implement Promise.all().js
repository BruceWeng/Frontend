/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 */
async function all(promises) {
  const result = [];
  for (const promise of promises) {
    result.push(await promise);
  }
  return result;
}