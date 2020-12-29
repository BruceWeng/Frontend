
/**
 * @param {string} str
 * @return {string[]}
 */
function extract(str) {
  // your code here
  const result = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "<" 
        && str[i+1] === "a"
        && (str[i+2] === " " || str[i+2] === ">")
       ) {
      let temp = str.slice(i, i+3);
      i += 3;
      while (i < str.length) {
        if (str[i] === "a" && str[i+1] === ">") {
          break;
        }
        temp += str[i];
        i++;
      }
      temp += "a>";
      result.push(temp);
    }
  }
  return result;
}