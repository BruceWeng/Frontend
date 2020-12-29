/**
 * @param { Array<(arg: any) => any> } funcs 
 * @returns { (arg: any) => any }
 */
function pipe(funcs) {
  return (l) => {
    let last = l;
    for (const f of funcs) {
      last = f(last);
    }
    return last;
  }
}