// interface Laziness {
//   sleep: (time: number) => Laziness
//   sleepFirst: (time: number) => Laziness
//   eat: (food: string) => Laziness
// }

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */
function LazyMan(name, logFn) {
  const ids = new Map();
  let delay = 0;
  let called = false;
  const man = {
    intro: (param) => {
      ids.set(`intro-${param}`, setTimeout(() => {
        logFn(`Hi, I'm ${param}.`);
      }, delay));
      return man;
    },
    eat: (param) => {
      ids.set(`eat-${param}`, setTimeout(() => logFn(`Eat ${param}.`), delay));
      return man;
    },
    sleep: (param) => {
      delay += param * 1000;
      setTimeout(() => logFn(`Wake up after ${param} second${param > 1 ? 's': ''}.`), delay);
      return man;
    },
    sleepFirst: (param) => {
      man.sleep(param);
      for (const [name, timeout] of ids) {
        clearTimeout(timeout); 
        const [n, p] = name.split('-');
        man[n](p);
      }
      return man;
    }
  }
  man.intro(name);
  return man;  
}