// Assume all the keys are unique.
class TreeNode {
  constructor(key) {
    this.left = null;
    this.right = null;
    this.key = key;
  }
}
function insertNode(node, key) {
  if (node === null) {
    node = new TreeNode(key);
    return node;
  }
  if (key < node.key) node.left = insertNode(node.left, key);
  else node.right = insertNode(node.right, key);
  return node;
}

function inorder(node, result=[]) {
  if (node == null) return;
  inorder(node.left, result);
  result.push(node.key);
  inorder(node.right, result);
  return result;
}

function minValueNode(node) {
  while (node.left !== null) node = node.left;
  return node;
}

function deleteNode(node, key) {
  if (node === null) return node;
  if (key < node.key) node.left = deleteNode(node.left, key);
  if (key > node.key) node.right= deleteNode(node.right, key);
  if (key === node.key) {
    if (node.left === null) {
      let new_node = node.right;
      node = null;
      return new_node;
    }
    if (node.right === null) {
      let new_node = node.left;
      node = null;
      return new_node;
    }
    // If both children are not null
    // Replace inorder successor (next larger node of target) key to this node 
    let successor = minValueNode(node.right);
    node.key = successor.key;
    // Delete inorder successor 
    node.right = deleteNode(node.right, successor.key);
  }
  return node;
}

let root = new TreeNode(1);
root = insertNode(root, 4);
root = insertNode(root, 3);
root = insertNode(root, 2);
console.log(inorder(root)); // [1,2,3,4]
console.log(minValueNode(root)); // node 1
root = deleteNode(root, 3);
console.log(inorder(root)); // [1,2,4]