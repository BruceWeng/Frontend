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