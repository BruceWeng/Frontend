// getAPI is bundled with your code, config will only be some plain objects.
// const getAPI = <T>(path: string, config: SomeConfig): Promise<T> => { ... }


// you code here maybe, if you want some outer scope.

/**
 * @param {string} path
 * @param {object} config
 * only plain objects/array made up serializable primitives
 * @returns {Promise<any>}
 */
const cache = new Map();

function hashPathConfig(path, config) {
  const result = [path];
  for (const [key, value] of Object.entries(config).sort()) {
    result.push(String(value));
  }
  return result.join('_');
}

function getAPIWithMerging(path, config) {
  let key = hashPathConfig(path, config);
  if (!cache.has(key)) {
    while (cache.size === 5) {
      let keys = Array.from(cache.keys());
      let last_key = keys[0];
      cache.delete(last_key);
    }
    let new_result = getAPI(path, config);
    cache.set(key, [new_result, Date.now()]);
    return new_result;
  } else {
    const [result, time] = cache.get(key);
    let curr_time = Date.now();
    if (curr_time - time >= 1000) {
      let new_result = getAPI(path, config);
      cache.set(key, [new_result, curr_time]);
      return new_result;
    } else {
      return result;
    }
  }
}

getAPIWithMerging.clearCache = () => {
  cache.clear();
}