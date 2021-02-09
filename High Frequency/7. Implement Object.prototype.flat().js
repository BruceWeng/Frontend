/**
 * Write a function flatten(object: object, depth: number): object
 * Flattrn object with given array.
 */
const user = {
  name: "Vishal",
  address: {
    primary: {
      house: "109",
      street: {             
        main: "21",
        cross: "32"
      }
    }
  }
};
console.log(flat(user, 1));
/*
{
  name: 'Vishal',
  address_primary: {
    house: '109',
    street: {
      main: '21',
      cross: '32'
    }
  }
}
*/
console.log(flat(user)); 
/*
{
  name: 'Vishal',
  address_primary_house: '109',
  address_primary_street_main: '21',
  address_primary_street_cross: '32'
}
*/
function flat(obj, depth=Infinity, parent_key='') {
  let result = {};
  for (const key in obj) {
    const new_key = parent_key === '' ? key : `${parent_key}_${key}`;
    if (typeof obj[key] === "object" && depth > 0) {
      result = {...result, ...flat(obj[key], depth-1, new_key)};
    } else {
      result[new_key] = obj[key];
    }
  }
  return result;
};

function flat(obj, depth=Infinity) {
  const result = {};
  const stack = [...Object.keys(obj).map(key => {
    return [obj[key], depth, key];
  })];
  while (stack.length !== 0) {
    const [current, depth, parent_key] = stack.pop(); // current = object | value
    if (typeof current === 'object' && depth > 0) {
      stack.push(...Object.keys(current).map(key => {
        const new_key = parent_key === '' ? key : `${parent_key}_${key}`;
        return [current[key], depth-1, new_key];
      }));
    } else {
      result[parent_key] = current;
    }
  }
  return result;
}
