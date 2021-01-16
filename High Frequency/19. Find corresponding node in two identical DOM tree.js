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

function Command(next_action, node) {
  return {
    next_action,
    node
  }
}

const findCorrespondingNode = (rootA, rootB, target) => {
  // your code here
  if (rootA === target) return rootB;
  // preorder
  let childrenA = [...rootA.children].reverse();
  let childrenB = [...rootB.children].reverse();
  const stackA = [...childrenA.map((child) => Command(ACTION.VISIT, child))];
  const stackB = [...childrenB.map((child) => Command(ACTION.VISIT, child))];
  while (stackA.length !== 0) {
    const currentA = stackA.pop();
    const currentB = stackB.pop();
    if (currentA.next_action === ACTION.COMPARE) {
      if (currentA.node === target) return currentB.node;
      continue;
    }
    //reverse action
    childrenA = [...currentA.node.children].reverse();
    childrenB = [...currentB.node.children].reverse();
    stackA.push(...childrenA.map((child) => Command(ACTION.VISIT, child)));
    stackB.push(...childrenB.map((child) => Command(ACTION.VISIT, child)));
    stackA.push(Command(ACTION.COMPARE, currentA.node));
    stackB.push(Command(ACTION.COMPARE, currentB.node));
  }
  return null;
}