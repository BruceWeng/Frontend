/**
 * MyElement is the type your implementation supports
 *
 * type MyNode = MyElement | string
 */

/**
 * @param {string} type - valid HTML tag name
 * @param {object} [props] - properties.
 * @param {...MyNode} [children] - elements as rest arguments
 * @return {MyElement}
 */
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children
    }
  };
}

/**
 * @param {object} json - valid JSON presentation
 * @return {HTMLElement}
 */
function render(json) {
  // create the top level element
  // recursively append the children
  // textnode
  if (typeof json === 'string') {
    return document.createTextNode(json);
  }
  // element
  const {type, props: {children, ...attrs}} = json;
  const element = document.createElement(type);
  for (const [attr, value] of Object.entries(attrs)) {
    element[attr] = value;
  }
  const childrenArr = Array.isArray(children) ? children : [children];
  for (const child of childrenArr) {
    element.append(render(child));
  }
  return element;
}