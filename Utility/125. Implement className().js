/**
 * @param {any[]} args
 * @returns {string}
 */
function classNames(...args) {
  const classArr = [];
  checkAndPass(args, classArr);
  return classArr.join(" ");
}

function checkAndPass(args, classArr) {
  if (typeof args === "string" || typeof args === "number") {
    classArr.push(args);
  } else if (Array.isArray(args)) {
    args.forEach((arg) => {
      checkAndPass(arg, classArr);
    });
  } else if (typeof args === "object" && args) {
    Object.keys(args).forEach((key) => {
      if (args[key]) classArr.push(key);
    });
  }
}