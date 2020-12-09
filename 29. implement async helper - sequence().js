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
function sequence(funcs) {
  return (callback, initData) => {
    const finalPromise = funcs.reduce((acc, func) => {
      return acc
      .then(data => makePromise(func, data))
      .catch(err => Promise.reject(err));
    }, Promise.resolve(initData));

    finalPromise
    .then(data => callback(undefined, data))
    .catch(err => callback(err));
  }
}

const makePromise = (func, initData) => {
  return new Promise((resolve, reject) => {
    func((err, data) => {
      if (err) reject(err);
      resolve(data);
    }, initData);
  })
}