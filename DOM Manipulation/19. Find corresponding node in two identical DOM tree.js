/**
 * @param {HTMLElement} rootA
 * @param {HTMLElement} rootB - rootA and rootB are clone of each other
 * @param {HTMLElement} target
 */
const findCorrespondingNode = (rootA, rootB, target) => {
  if (rootA === target) return rootB
  const childrenA = Array.from(rootA.children)
  const childrenB = Array.from(rootB.children)
  for (let i = 0; i < childrenA.length; i++) {
    const founded = findCorrespondingNode(childrenA[i], childrenB[i], target)
    if (founded) {
      return founded
    }
  }
  return null
}

// Iteration solution
/**
 * @param {HTMLElement} rootA
 * @param {HTMLElement} rootB - rootA and rootB are clone of each other
 * @param {HTMLElement} target
 */
const findCorrespondingNode = (rootA, rootB, target) => {
  const stackA = [rootA]
  const stackB = [rootB]
  while (stackA.length > 0) {
    const topA = stackA.pop()
    const topB = stackB.pop()
    if (topA === target) return topB
    stackA.push(...topA.children)
    stackB.push(...topB.children)
  }
  return null
}