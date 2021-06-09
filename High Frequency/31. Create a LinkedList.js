class ListNode {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  insertFirst(val) {
    if(this.head===null) this.head = this.tail = new ListNode(val)
    else {
      let new_node = new ListNode(val)
      new_node.next = this.head
      this.head = new_node
    }
    this.size++
    return this.head
  }

  insertLast(val) {
    if(this.head===null) this.head = this.tail = new LinkedList(val)
    else {
      let new_node = new ListNode(val) 
      this.tail.next = new_node
      this.tail = new_node
    }
    this.size++
    return this.tail
  }

  insertAt(position, val) {
    if(position>=this.size) return null
    let current = this.head
    for(let i=0; i<position-1; i++) {
      current = current.next
    }
    let new_node = new ListNode(val)
    new_node.next = current.next
    current.next = new_node
    this.size++
    return current.next
  }

  forEach(cb) {
    let current = this.head
    for(let i=0; i<this.size; i++) {
      cb(current, i)
      current = current.next
    }
  }

  find(cb) {
    let current = this.head
    for(let i=0; i<this.size; i++) {
      if(cb(current, i)===true) return current
      current = current.next
    }
    return null
  }

  removeFirst() {
    if(this.head===null) return null
    const return_node = this.head
    this.head = this.head.next
    return_node.next = null
    this.size--
    return return_node
  }

  removeLast() {
    if(this.tail===null) return null
    let current = this.head
    for(let i=0; i<this.size-2; i++) {
      current = current.next
    }
    const return_node = current.next
    current.next = null
    this.size--
    return return_node
  }

  removeAt(position) {
    if(position>=this.size) return null
    let current = this.head
    for(let i=0; i<position-1; i++) {
      current = current.next
    }
    const return_node = current.next
    current.next = current.next.next
    this.size--
    return return_node
  }
}

const linkedList = new LinkedList()

console.log(linkedList.insertFirst(1))
console.log(linkedList.insertFirst(2))
console.log(linkedList.insertLast(3))
console.log(linkedList.insertAt(1, 4))
console.log(linkedList.forEach((node, position) => console.log(node, position)))
console.log(linkedList.find((node, position) => (node.val === 4)))
console.log('removeFirst')
console.log(linkedList.removeFirst())
console.log(linkedList.forEach((node, position) => console.log(node, position)))
console.log('removeLast')
console.log(linkedList.removeLast())
console.log(linkedList.forEach((node, position) => console.log(node, position)))
linkedList.insertFirst(6)
console.log('removeAt(2)')
console.log(linkedList.removeAt(2))
console.log(linkedList.forEach((node, position) => console.log(node, position)))
