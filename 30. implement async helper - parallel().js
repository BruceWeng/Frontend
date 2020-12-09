/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
  callback: Callback,
  data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function parallel(funcs) {
  // your code here
  return function(callback, input) {
    promiseAll(funcs.map(func => makePromise(func, input)))
    .then(data => callback(undefined, data))
    .catch(err => callback(err, input))
  }
}

function promiseAll(promises) {
  return promises.reduce((prev, next) => {
    return prev
    .then(res => next.then(data => [...res, data]),
          err => Promise.reject(err))
  }, Promise.resolve([]));
}

const makePromise = (func, input) => {
  return new Promise((resolve, reject) => {
    func((err, data) => {
      if (err) reject(err);
      resolve(data);
    }, input);
  })
}