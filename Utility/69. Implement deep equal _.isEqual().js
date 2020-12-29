function isEqual(a, b) {
  const set = new Set();
  function eq(a, b) {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (a === NaN || b === NaN) return false;
    set.add(a);
    set.add(b);
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((curr, i) => {
        if (set.has(curr) || set.has(b[i])) return true;
        return eq(curr, b[i]);
      });
    }
    if (typeof a === 'object' && typeof b === 'object') {
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
      if (aKeys.length !== bKeys.length) return false;
      return Object.keys(a).every((curr) => {
        if (set.has(a[curr]) || set.has(b[curr])) return true;
        return eq(a[curr], b[curr]);
      });
    }
    set.delete(a);
    set.delete(b);
    return false;
  }
  return eq(a, b);
}