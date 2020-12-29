/**
 * @param {HTMLElement} el - element to be wrapped
 */
function $(el) {
  return {
    css(propertyName, value) {
      el.style[propertyName] = value;
      return this;
    }
  }
}