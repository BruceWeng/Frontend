/**
 * Promise.race is settled as soon as any of the promises you feed it settle, 
 * whether they are fulfilled or rejected.
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