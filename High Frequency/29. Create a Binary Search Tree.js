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

// lowerBound: among all the nodes that node.key > target.key, find the minimum node
function successor(node, target) {
  if (node === null) return null;
  if (node.key > target.key) {
    let left = successor(node.left, target);
    return left !== null ? left : node;
  }
  else return successor(node.right, target);
}

// upperBound: among all the nodes that node.key < target.key, find the maximum node
function predecessor(node, target) {
  if (node === null) return null;
  if (node.key < target.key) {
    let right = predecessor(node.right, target);
    return right !== null ? right : node;
  }
  else return predecessor(node.left, target);
}

let root = new TreeNode(1);
root = insertNode(root, 4);
root = insertNode(root, 3);
root = insertNode(root, 2);
console.log(inorder(root)); // [1,2,3,4]
console.log(minValueNode(root)); // TreeNode(1)
root = deleteNode(root, 3);
console.log(inorder(root)); // [1,2,4]
console.log(successor(root, new TreeNode(2))); // TreeNode(4)
console.log(predecessor(root, new TreeNode(2))); // TreeNode(1)