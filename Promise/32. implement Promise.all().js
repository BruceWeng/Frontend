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

function all(promises) {
  return promises.reduce((result, promise) => {
    return result.then(result => !(promise instanceof Promise) 
                                ? [...result, promise] 
                                : promise.then(data => [...result, data]), (error) => Promise.reject(error))
  }, Promise.resolve([]));
}