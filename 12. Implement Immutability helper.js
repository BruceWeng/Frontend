/**
 * @param {any} data
 * @param {Object} command
 */
function update(data, command) {
  let new_data = data; 
  if (isArray(data)) {
    new_data = [...data];
  } else if (isObject(new_data)) {
    new_data = {...data};
  } else {
    new_data = data
  }
  Object.keys(command).forEach(key => {
    if (key.includes('$')) {
      switch(key) {
        case '$push': {
          if (!isArray(new_data)) throw 'no array';
          new_data = [...new_data, ...command[key]];
          break;
        }
        case '$set': {
          new_data = command[key];
          break;
        }
        case '$merge': {
          if (!isObject(new_data)) throw 'no object';
          new_data = {...new_data, ...command[key]};
          break;
        }
        case '$apply': {
          const fn = command[key];
          if (isArray(new_data)) {
            new_data = new_data.map(el => fn(el))
          } else {
            new_data = fn(new_data);
          }
          break;
        }
      }
    } else {
      if (command[key]) {
        new_data[key] = update(new_data[key], command[key])
      }
    }
  })
  return new_data;
}
const isArray = (arr) => {
  return Array.isArray(arr);
}
const isObject = (obj) => {
  return typeof obj == 'object';
}