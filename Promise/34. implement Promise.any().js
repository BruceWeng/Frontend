/**
 * Promise.any is settled as soon as any of the promises you feed it is fulfilled or 
 * they are all rejected, in which case it's rejected with an AggregateError.
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function any(promises) {
  // your code here
  return new Promise((resolve, reject) => {
    const errors = [];
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(value => resolve(value), error => {
        errors[i] = error; // errors need to be in order
        if (errors.length === promises.length) {
          reject(new AggregateError('No Promise in Promise.any was resolved', errors))
        }
      });
    }
  });
}