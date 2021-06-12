function createIndegrees(edges) {
	const indegrees = {}
	for(let src_key in edges) {
	  for(let dest_key of edges[src_key]) {
	    if(!(dest_key in indegrees)) indegrees[dest_key] = 0
	    indegrees[dest_key]++
	  }
	  if(!(src_key in indegrees)) indegrees[src_key] = 0
	}
	return indegrees
}

function topologicalSort(edges, indegrees) {
	const result = []
	let queue = new Queue()
	// find root
	for(let key in indegrees) {
	  if(indegrees[key]===0) queue.enqueue(key)
	}
	while(queue.length!==0) {
	  let src_key = queue.dequeue()
	  // find dest_key
	  for(let key in edges) {
	    if(key==src_key) { // loose comparison to pass '1'==1
	      for(let dest_key of edges[src_key]) {
					indegrees[dest_key]--
					if(indegrees[dest_key]===0) queue.enqueue(dest_key)
				}
			}
		}
		result.push(src_key)
	}
	return result  
}

class Queue {
	constructor() {
		this.head = null
		this.tail = null
		this.size = 0
	}

	enqueue(val) {
		const new_node = {val, next: null}
		if(this.head===null) this.head = this.tail = new_node
		else {
			this.tail.next = new_node
			this.tail = this.tail.next
		}
		this.size++
	}

	dequeue() {
		if(this.head===null) return null
		let result_node = this.head
		this.head = this.head.next
		this.size--
		return result_node.val
	}

	size() {
		return this.size
	}
}