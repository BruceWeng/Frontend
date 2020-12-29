/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function allSettled(promises) {
  // Using promise all
  return Promise.all(promises.map(promise => Promise.resolve(promise)
  .then((value) => {
    return {
      status: 'fulfilled',
      value
    };
  }, (reason) => {
    return {
      status: 'rejected',
      reason
    };
  })));
}

function allSettled(promises) {
  return promises.reduce((result, promise) => {
    return result.then(result => {
      return !(promise instanceof Promise)
        ? [...result, {status: 'fulfilled', value: promise}]
        : promise.then(data => [...result, {status: 'fulfilled', value: data}],
                      (error) => [...result, {status: 'rejected', reason: error}])
    })
  }, Promise.resolve([]));
}