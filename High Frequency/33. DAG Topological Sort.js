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
	let candidate = []
	// find root
	for(let key in indegrees) {
	  if(indegrees[key]===0) candidate.push(key)
	}
	while(candidate.length!==0) {
	  let src_key = candidate.shift()
	  // find dest_key
	  for(let key in edges) {
	    if(key==src_key) { // loose comparison to pass '1'==1
	      for(let dest_key of edges[src_key]) {
					indegrees[dest_key]--
					if(indegrees[dest_key]===0) candidate.push(dest_key)
				}
			}
		}
		result.push(src_key)
	}
	return result  
}