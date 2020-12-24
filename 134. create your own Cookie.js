// enable myCookie
function install() {
  // Map<string, {value: string, maxAge?: number, createdAt: number}>
  const store = new Map();
  // use getter and setter
  Object.defineProperty(document, 'myCookie', {
    get() {
      const result = [];
      for (let [key, entry] of store.entries()) {
        if (entry.maxAge !== undefined) {
          if (Date.now() - entry.createdAt >= entry.maxAge) {
            // expire
            store.delete(key);
            continue;
          }
        }
        result.push(`${key}=${entry.value}`);
      }
      return result.join('; ');
    },

    set(valueStr) {
      const [keyValuePair, option] = valueStr.split(';');
      let [key, value] = keyValuePair.split('=');
      key = key.trim();
      value = value.trim();
      const entry = {
        value,
        createdAt: Date.now()
      }
      
      if (option !== undefined) {
        const [key, value] = option.trim().split('=');
        if (key === 'max-age') {
          const maxAge = Number(value) * 1000;
          entry.maxAge = maxAge;
        }
      }
      
      store.set(key, entry);
    },

    configurable: true
  });
}

// disable myCookie
function uninstall() {
  delete document.myCookie;
}

const document = {};
install(document);
// 1. support get and set
document.myCookie = 'bfe=dev'
// "bfe=dev"

document.myCookie = 'bfe1=dev1'
// "bfe1=dev1"

document.myCookie
console.log(document.myCookie); // "bfe=dev; bfe1=dev1"

// 2. support max-age clear
document.myCookie = 'bfe=dev; max-age=1'
// "bfe=dev; max-age=1"

document.myCookie
console.log(document.myCookie); // "bfe=dev"

// after 1 sec
document.myCookie
// ""