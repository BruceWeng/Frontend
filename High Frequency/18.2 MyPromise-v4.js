class MyPromise {
  STATE = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2
  }
  constructor(executor) {
    this.state = this.STATE.PENDING
    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._reject(error)
    }
  }

  // Consumer
  // Define class level variable in then: 
  // onFulfilled, onRejected, thenResolve, thenReject
  then(onFulfilled, onRejected) {
    // Register consuming functions.
    // assign a callback return value to class variable if onFulfilled is not a function
    this.onFulfilled = typeof onFulfilled === 'function'
      ? onFulfilled 
      : (value) => value
    // assign a callback throw error to class variable if onRejected is not a function
    this.onRejected = typeof onRejected === 'function'
      ? onRejected
      : (value) => {throw value}
    return new MyPromise((resolve, reject) => {
      // Register `resolve` and `reject`, so that we can
      // resolve or reject this promise in `_resolve`
      // or `_reject`.
      this.thenResolve = resolve
      this.thenReject = reject
    });
  }

  // Consumer
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  // Consumer
  finally(onFinally) {
    // execute onFinally callback when settled, and pass down previous promise to next handler
    // onFinally should not alter the resolve value
    // onFinally should not alter the rejection reason
    return this.then(
      (value) => Promise.resolve(onFinally()).then(() => value), 
      (value) => Promise.resolve(onFinally()).then(() => Promise.reject(value))
    )
  }

  // Producer
  _resolve(value) {
    // only handle pending promise
    if (this.state !== this.STATE.PENDING) return
    // change state and result
    this.state = this.STATE.FULFILLED
    this.result = value
    // in _resolve: returnValue is this.onFulfilled(this.result)
    // in queueMicrotask: 
    // in try:
    // if returnValue is a promise, assign thenResolve and thenReject to returnValue.then()
    // else this.thenResolve(returnValue)
    // in catch (error):
    // this.thenReject(error)
    queueMicrotask(() => {
      if (this.onFulfilled === undefined) return
      try {
        const returnValue = this.onFulfilled(this.result)
        if (returnValue instanceof MyPromise) {
          returnValue.then(this.thenResolve, this.thenReject)
        } else {
          this.thenResolve(returnValue)
        }
      } catch (error) {
        this.thenReject(error)
      }
    });
  }

  // Producer
  // only 3 lines different from _resolve
  _reject(value) {
    if (this.state !== this.STATE.PENDING) return
    this.state = this.STATE.REJECTED // (1)
    this.result = value
    queueMicrotask(() => {
      if (this.onRejected === undefined) return // (2)
      try {
        const returnValue = this.onRejected(this.result) // (3)
        if (returnValue instanceof MyPromise) {
          returnValue.then(this.thenResolve, this.thenReject)
        } else {
          this.thenResolve(returnValue)
        }
      } catch (error) {
        this.thenReject(error)
      }
    });
  }

  static resolve(value) {
    return (value instanceof MyPromise) 
      ? value 
      : new MyPromise((resolve, _) => resolve(value))
  }

  static reject(value) {
    return new MyPromise((_, reject) => reject(value))
  }
}

// Check typeof input as function in 'then'
// Check typeof input as MyPromise in _resolve, _reject and resolve