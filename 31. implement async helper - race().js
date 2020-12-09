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
function race(funcs) {
  // your code here
  return function(callback, initData) {
    promiseRace(funcs.map(func => makePromise(func, initData)))
    .then(data => callback(undefined, data))
    .catch(err => callback(err, initData));
  }
}

function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => promise.then(data => resolve(data), err => reject(err)));
  });
}

const makePromise = (func, initData) => {
  return new Promise((resolve, reject) => {
    func((err, data) => {
      if (err) reject(err);
      resolve(data);
    }, initData);
  });
}