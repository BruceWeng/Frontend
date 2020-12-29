/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function race(promises) {
  // your code here
  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      promise.then(value => resolve(value), error => reject(error));
    }
  });
}