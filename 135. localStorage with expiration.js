window.myLocalStorage = {
  storage: {},

  getItem(key) {
    let item = window.myLocalStorage.storage[key];
    if (item !== undefined) {
      if (Date.now() >= item.expiry) {
        delete item;
      } else {
        return item.value;
      }
    }
    return null;
  },

  setItem(key, value, maxAge) {
    window.myLocalStorage.storage[key] = {
      value,
      expiry: Date.now() + maxAge
    }
  },

  removeItem(key) {
    delete window.myLocalStorage.storage[key];
  },

  clear() {
    window.myLocalStorage.storage = {};
  }
}