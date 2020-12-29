/**
 * @param {() => Promise<any>} func
 * @param {number} max
 * @return {Promise}
 */
function throttlePromises(func, max) {
  const results = [];
  async function doWork(iterator) {
    for (let [index, func] of iterator) {
      const result = await func();
      results[index] = result;
    }
  }
  const iterator = Array.from(func).entries();
  const workers = Array(max).fill(iterator).map(doWork); // maps over asynchronous fn doWork, which returns array of results for each promise
  return Promise.all(workers).then(() => results);
}