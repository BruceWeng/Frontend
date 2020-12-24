class MyURLSearchParams {
  map = new Map();
  /**
   * @params {string} init
   */
  constructor(init) {
    if (init.charAt(0) === "?") init = init.slice(1);
    const parts = init.split("&");
    for (const part of parts) {
      const [key, val] = part.split("=");
      this.append(key, val);
    }
  }

  /**
   * @params {string} name
   * @params {any} value
   */
  append(name, value) {
    value = value + "";
    const values = this.map.has(name)
      ? [...this.map.get(name), value]
      : [value];
    this.map.set(name, values);
  }

  /**
   * @params {string} name
   */
  delete(name) {
    this.map.delete(name);
  }

  /**
   * @returns {Iterator}
   */
  entries() {
    const map = this.map;
    return (function* () {
      for (const [key, values] of map.entries()) {
        for (const value of values) {
          yield [key, value];
        }
      }
    })();
  }

  /**
   * @param {(value, key) => void} callback
   */
  forEach(callback) {
    for (const [key, val] of this.entries(true)) {
      callback(val, key);
    }
  }

  /**
   * @param {string} name
   * returns the first value of the name
   */
  get(name) {
    if (this.map.has(name) && this.map.get(name).length) {
      return this.map.get(name)[0];
    }
    return null;
  }

  /**
   * @param {string} name
   * @return {string[]}
   * returns the value list of the name
   */
  getAll(name) {
    if (this.map.has(name)) {
      return this.map.get(name);
    }
    return [];
  }

  /**
   * @params {string} name
   * @return {boolean}
   */
  has(name) {
    return this.map.has(name);
  }

  /**
   * @return {Iterator}
   */
  keys() {
    return this.map.keys();
  }

  /**
   * @param {string} name
   * @param {any} value
   */
  set(name, value) {
    this.map.set(name, [value + ""]);
  }

  // sor all key/value pairs based on the keys
  sort() {
    const keys = Array.from(this.map.keys()).sort();
    const newArr = [];
    for (const key of keys) {
      newArr.push([key, this.map.get(key)]);
    }
    this.map = new Map(newArr);
  }

  /**
   * @return {string}
   */
  toString() {
    const ret = [];
    for (const [key, val] of this.entries()) {
      ret.push(`${key}=${val}`);
    }
    return ret.join("&");
  }

  /**
   * @return {Iterator} values
   */
  values() {
    return [...this.map.values()].flat();
  }
}

const params = new MyURLSearchParams("?a=1&a=2&b=2");
console.log(params.get("a")); // '1'
console.log(params.getAll("a")); // ['1', '2']
console.log(params.get("b")); // '2'
console.log(params.getAll("b")); // ['2']

console.log(params.append("a", 3));
console.log(params.set("b", "3"));
console.log(params.toString()); // 'a=1&a=2&b=3&a=3'
