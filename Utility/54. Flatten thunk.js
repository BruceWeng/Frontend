/**
 * @param {Thunk} thunk
 * @return {Thunk}
 */
function flattenThunk(thunk) {
  return function(callback) {
    function nextCallback(err, dataOrThunk) {
      if (err) {
        callback(err, undefined);
      } else {
        if (typeof dataOrThunk === 'function') {
          dataOrThunk(nextCallback);
        } else {
          callback(undefined, dataOrThunk);
        }
      }
    }
    thunk(nextCallback);
  }
}