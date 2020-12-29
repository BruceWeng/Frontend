/**
 * @param {HTMLElement} element
 * @return {object} JSON presentation
 */
function virtualize(element) {
  // virtualize top level element
  // recursively handle the children (childNodes)
  const result = {
    type: element.tagName.toLowerCase(),
    props: {}
  };
  // props (without children)
  for (let attr of element.attributes) {
    const name = attr.name === 'class' ? 'className' : attr.name;
    result.props[name] = attr.value;
  }
  // children
  const children = [];
  for (let node of element.childNodes) {
    if (node.nodeType === 3) { // text node
      children.push(node.textContent);
    } else {
      children.push(virtualize(node));
    }
  }
  result.props.children = children.length === 1 ? children[0] : children;
  return result;
}

/**
 * @param {object} json
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