/**
 * Write a function findCorrespondingNode(rootA: HTMLElement, rootB: HTMLElement, target: HTMLElement): HTMLElement
 * Given two same DOM tree A, B, and an Element a in A, find the corresponding Element b in B.
 * By corresponding, we mean a and b have the same relative position to their DOM tree root.
 * 
 * follow up
 * This could a problem on general Tree structure with only children.
 * Could you solve it recursively and iteratively?
 * 
 * Could you solve this problem both with special DOM api for better performance?
 * What are the time cost for each solution?
 */
// Recursion
function findCorrespondingNode(rootA, rootB, target) {
  if (rootA === target) return rootB;
  for (let i = 0; i < rootA.children.length; i++) {
    const result = findCorrespondingNode(rootA.children[i], rootB.children[i], target);
    if (result !== null) return result;
  }
  return null;
}

// Itration
const findCorrespondingNode = (rootA, rootB, target) => {
  const stackA = [rootA];
  const stackB = [rootB];
  while (stackA.length !== 0) {
    const nodeA = stackA.pop();
    const nodeB = stackB.pop();
    if (nodeA === target) return nodeB;
    stackA.push(...nodeA.children);
    stackB.push(...nodeB.children);
  }
  return null;
}

// Trace path from target to rootA with in dex in path[]
function findCorrespondingNode(rootA, rootB, target) {
  if (rootA === target) return rootB;
  const path = [];
  let node = target;
  while (node !== rootA) {
    const parent = node.parentElement;
    const index = [...parent.children].indexOf(node);
    path.push(index);
    node = parent;
  }
  return path.reduceRight((result, index) => result.children[index], rootB);
}

// Preorder Itration
const ACTION = {
  VISIT: 0,
  COMPARE: 1
}

const findCorrespondingNode = (rootA, rootB, target) => {
  // your code here
  if (rootA === target) return rootB;
  // preorder
  let childrenA = [...rootA.children].reverse();
  let childrenB = [...rootB.children].reverse();
  const stackA = [...childrenA.map((child) => [child, ACTION.VISIT])];
  const stackB = [...childrenB];
  while (stackA.length !== 0) {
    const [nodeA, next_action] = stackA.pop();
    const nodeB = stackB.pop();
    if (next_action === ACTION.COMPARE) {
      if (nodeA === target) return nodeB;
      continue;
    }
    //reverse action
    childrenA = [...nodeA.children].reverse();
    childrenB = [...nodeB.children].reverse();
    stackA.push(...childrenA.map((child) => [child, ACTION.VISIT]));
    stackB.push(...childrenB);
    stackA.push([nodeA, ACTION.COMPARE]);
    stackB.push(nodeB);
  }
  return null;
}