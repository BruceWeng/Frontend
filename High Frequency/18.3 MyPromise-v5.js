class MyPromise {
	STATE = {
	  PENDING: 0,
	  FULFILLED: 1,
	  REJECTED: 2
	}
	constructor(executor) {
	  // your code here
	  this.state = this.STATE.PENDING
	  this.result = null
	  this.onFulfilled = null
	  this.onRejected = null
	  this.thenResolve = null
	  this.thenReject = null
	  try {
	    executor(this._resolve.bind(this), this._reject.bind(this))
	  } catch(e) {
	    this._reject(e)
	  }
	}
	
	then(onFulfilled, onRejected) {
	  // your code here
	  this.onFulfilled = typeof onFulfilled==='function'
	    ? onFulfilled
	    : (value) => value
	  this.onRejected = typeof onRejected==='function'
	    ? onRejected
	    : (e) => {throw e}
	  return new MyPromise((resolve, reject) => {
	    this.thenResolve = resolve
	    this.thenReject = reject
	  })
	}
	
	catch(onRejected) {
	  // your code here
	  return this.then(undefined, onRejected)
	}
      
	_resolve(value) {
	  if(this.state!==this.STATE.PENDING) return
	  this.state = this.STATE.FULFILLED
	  this.result = value
	  queueMicrotask(() => {
	    if(this.onFulfilled===null) return
	    try {
	      const returnValue = this.onFulfilled(value)
	      if(returnValue instanceof MyPromise) 
		returnValue.then(this.thenResolve, this.thenReject)
	      else this.thenResolve(returnValue)
	    } catch(e) {
	      this.thenReject(e)
	    }
	  })
	}
      
	_reject(value) {
	  if(this.state!==this.STATE.PENDING) return
	  this.state = this.STATE.REJECTED
	  this.result = value
	  queueMicrotask(() => {
	    if(this.onRejected===null) return
	    try {
	      const returnValue = this.onRejected(value)
	      if(returnValue instanceof MyPromise) 
		returnValue.then(this.thenResolve, this.thenReject)
	      else this.thenResolve(returnValue)
	    } catch(e) {
	      this.thenReject(e)
	    }
	  })
	}
	
	static resolve(value) {
	  // your code here
	  return new MyPromise((resolve, _) => resolve(value))
	}
	
	static reject(value) {
	  // your code here
	  return new MyPromise((_, reject) => reject(value))
	}
}