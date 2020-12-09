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
  return (cb, initData) => {
    const finalPromise = funcs.reduce((acc, func) => {
      return acc
        .then(val => makePromise(func, val))
        .catch(err => Promise.reject(err));
    }, Promise.resolve(initData));

    finalPromise
      .then(val => cb(undefined, val))
      .catch(err => cb(err));
  }
}

const makePromise = (func, arg) => {
  return new Promise((resolve, reject) => {
    func((err, data) => {
      if (err) reject(err);
      resolve(data);
    }, arg);
  })
}