class Graph {
  constructor(isDirected) {
    this.isDirected = isDirected
    this.vertexes = {} //l {key: value}
    this.edges = {} 
    /** 
     * {
     *  srcKey: {
     *    destKey: weight
     *  }
     * }
     */
    this.vertexesCount = 0
    this.edgesCount = 0
    this.states = {}
  }

  addVertex(key, value) {
    this.vertexes[key] = value
    if(!(key in this.edges)) this.edges[key] = {}
    this.vertexesCount++
    this.states[key] = 'UNVISITED'
    return this
  }

  hasVertex(key) {
    return (key in this.vertexes)
  }

  addEdge(srcKey, destKey, weight) {
    if(!(srcKey in this.vertexes)) return null
    if(!(destKey in this.vertexes)) return null
    if(weight!==undefined && typeof weight!=='number') return null
    weight = undefined ? 1 : weight
    this.edges[srcKey][destKey] = weight
    if(!this.isDirected) {
      if(!(destKey in this.edges)) this.edges[destKey] = {}
      this.edges[destKey][srcKey] = weight
    }
    this.edgesCount++
    return this
  }

  hasEdge(srcKey, destKey) {
    return (srcKey in this.vertexes && destKey in this.vertexes && destKey in this.edges[srcKey])
  }

  removeVertex(key) {
    if(!(key in this.vertexes)) return null
    delete this.vertexes[key]
    delete this.states[key]
    // remove edge for graph
    for(let destKey in this.edges[key]) {
      this.removeEdge(destKey, key)
    }
    // remove edge for directed graph (key as destKey)
    for(let srcKey in this.edges) {
      if(key in this.edges[srcKey]) {
        delete this.edges[srcKey][key]
        this.edgesCount--
      }
    }
    // we need to get destKey from edges, delete edges[key] in the last
    delete this.edges[key]
    this.vertexesCount--
    return true
  }

  removeEdge(srcKey, destKey) {
    if(!(srcKey in this.vertexes)) return null
    if(!(srcKey in this.edges)) return null
    if(!(destKey in this.edges)) return null
    delete this.edges[srcKey][destKey]
    delete this.edges[destKey][srcKey]
    this.edgesCount--
    return true
  }

  shortestPath(srcKey) {
    const distances = {}
    for(let key in this.vertexes) distances[key] = Infinity
    distances[srcKey] = 0
    for(let srcKey in this.edges) {
      for(let destKey in this.edges[srcKey]) {
        let weight = this.edges[srcKey][destKey]
        distances[destKey] = Math.min(distances[destKey], distances[srcKey]+weight)
      }
    }
    return distances
  }

  traverseDfs(srcKey, cb, visited={}) {
    if(visited[srcKey]) return false
    if(!(srcKey in this.edges)) return false
    cb(srcKey, this.vertexes[srcKey])
    visited[srcKey] = true
    for(let key in this.edges[srcKey])
      if(!this.traverseDfs(key, cb, visited)) continue
  }

  traverseDfsStack(srcKey, cb) {
    let visited = {}
    let stack = [srcKey]
    visited[srcKey] = true
    while(stack.length!==0) {
      let key = stack.pop()
      cb(key, this.vertexes[key])
      for(let destKey in this.edges[key]) {
        if(visited[destKey]) continue
        stack.push(destKey)
        visited[destKey] = true
      }
    }
  }

  traverseBfs(srcKey, cb) {
    // mark visited[key] = true when put the key in the queue
    const queue = new Queue()
    const visited = {}
    queue.enqueue(srcKey)
    visited[srcKey] = true
    while(queue.size()!==0) {
      let size = queue.size()
      while(size!==0) {
        let key = queue.dequeue()
        cb(key, this.vertexes[key])
        for(let destKey in this.edges[key]) {
          if(visited[destKey]) continue
          queue.enqueue(destKey)
          visited[destKey] = true
        }
        size--
      }
    }
  }

  hasCycle(srcKey, states={...this.states}, parentKey=srcKey) {
    if(this.isDirected) {
      if(states[srcKey]==='NO_CYCLE') return false
      if(states[srcKey]==='CYCLE') return true
      states[srcKey] = 'CYCLE'
      if(srcKey in this.edges) {
        for(let destKey in this.edges[srcKey]) {
          if(this.hasCycle(destKey, states)) return true
        }
      }
      states[srcKey] = 'NO_CYCLE'
      return false
    }
    else {
      states[srcKey] = 'VISITED'
      for(let destKey in this.edges[srcKey]) {
        if(states[destKey]==='VISITED' && destKey!==parentKey) return true
        if(states[destKey]==='UNVISITED' && this.hasCycle(destKey, states, srcKey)) return true
      }
      return false
    }
  }

  clear() {
    this.vertexes = {}
    this.edges = {}
    this.vertexesCount = 0
    this.edgesCount = 0
    return true
  }
}

class Queue{
  constructor() {
    this.queue = []
  }
  enqueue(val) {
    this.queue.push(val)
    return true
  }
  dequeue() {
    return this.queue.shift()
  }
  size() {
    return this.queue.length
  }
}
const directedGraph = new Graph(true)
const graph = new Graph(false)
directedGraph
  .addVertex('v1', 1)
  .addVertex('v2', 2)
  .addVertex('v3', 3)
  .addVertex('v4', 4)
  .addVertex('v5', 5)
graph
  .addVertex('v1', true)
  .addVertex('v2', true)
  .addVertex('v3', true)
  .addVertex('v4', true)
  .addVertex('v5', true)
console.log(directedGraph.vertexesCount) // 5
console.log(directedGraph.hasVertex('v1')) // true
console.log(graph.vertexesCount) // 5
console.log(graph.hasVertex('v1')) // true
directedGraph
  .addEdge('v1', 'v2', 2)
  .addEdge('v1', 'v3', 3)
  .addEdge('v1', 'v4', 1)
  .addEdge('v2', 'v4', 1)
  .addEdge('v3', 'v5', 2)
  .addEdge('v4', 'v3', 1)
  .addEdge('v4', 'v5', 4)
graph
  .addEdge('v1', 'v2', 2)
  .addEdge('v2', 'v3', 3)
  .addEdge('v1', 'v3', 6)
  .addEdge('v2', 'v4', 1)
  .addEdge('v4', 'v3', 1)
  .addEdge('v4', 'v5', 4)
  .addEdge('v3', 'v5', 2)
console.log(directedGraph.edgesCount) // 7
console.log(graph.edgesCount) // 7
console.log(directedGraph.hasEdge('v1', 'v2')); // true
console.log(directedGraph.hasEdge('v2', 'v1')); // false
console.log(graph.hasEdge('v1', 'v2')) // true
console.log(graph.hasEdge('v2', 'v1')) // true
console.log(directedGraph.removeVertex('v5')) // true
console.log(directedGraph.vertexesCount); // 4
console.log(directedGraph.edgesCount); // 5
console.log(graph.removeVertex('v5')) // true
console.log(graph.vertexesCount) // 4
console.log(graph.edgesCount) // 5
console.log(directedGraph.removeEdge('v1', 'v3')) // true
console.log(directedGraph.edgesCount); // 4
console.log(graph.removeEdge('v2', 'v3')) // true
console.log(graph.edgesCount) // 4
console.log('DFS')
directedGraph.traverseDfsStack('v1', (key, value) => console.log(key, value))
graph.traverseDfsStack('v1', (key, value) => console.log(key, value))
console.log('BFS')
directedGraph.traverseBfs('v1', (key, value) => console.log(key, value))
console.log(graph.vertexes)
console.log(graph.edges)
graph.traverseBfs('v1', (key, value) => console.log(key, value))
console.log('shortest path')
console.log(directedGraph.vertexes)
console.log(directedGraph.edges)
console.log(directedGraph.shortestPath('v1'))
console.log(graph.states)
console.log(graph.hasCycle('v1')) // true
console.log(directedGraph.states)
console.log(directedGraph.hasCycle('v1')) // false