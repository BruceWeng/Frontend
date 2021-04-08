/**
 * Step1: Executor
 * We know that when you create a Promise instance, we need to pass in an executor function. 
 * The executor function should take two function arguments: the resolve function and the reject 
 * function. When the resolve function is invoked, the promise instance becomes resolved. If the 
 * executor function performs an exception, the reject function should be called, and the state 
 * of the Promise instance will be rejected.
 * If value is resolved, continue to handle next promise.
 * If reason is catched, continue to handle next promise.
 * 
 * enums: STATE, TYPE
 * properties: state: STATE, value: null , handlers: Array 
 * functions: resolve(value: Number | String) -> void, reject(reason: Error) -> void
 */
class MyPromise {
  // State machine
  STATE = {
    PENDING: 0,
    SUCCEEDED: 1,
    FAILED: 2
  }
  
  TYPE = {
    THEN: 0,
    CATCH: 1
  }

  // The initial state of the Promise object should be pending
  state = this.STATE.PENDING;

  // Store the value after success or reason after fail
  value = null;

  // This array is used to store both onSucceeded and onFailed functions in the chain call
  // { type: 'then' | 'catch', onSucceeded: fn, onFailed: fn}
  handlers = [];

  constructor(executor) {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    try {
      executor(this.resolve, this.reject);
    } catch (reason) {
      this.reject(reason);
    }
  }

  resolve(value) {
    this.resolve = () => null;
    this.state = this.STATE.SUCCEEDED;
    this.value = value;
    for (const { type, onSucceeded, onFailed } of this.handlers) {
      if (type === this.TYPE.THEN) {
        this.succeed(onSucceeded);
        if (this.state === this.STATE.FAILED) {
          return this.reject(this.value);
        }
      }
    }
    this.handlers.length = 0;
  }

  reject(reason) {
    this.reject = () => null;
    this.state = this.STATE.FAILED;
    this.value = reason;
    for (const { type, onSucceeded, onFailed } of this.handlers) {
      if (type === this.TYPE.CATCH) {
        this.fail(onFailed);
        // if (reason is catched) state is able to set to be SUCCEEDED and chain to next 'then'
        if (this.state = this.STATE.SUCCEEDED) {
          return this.resolve(this.value);
        }
      }
    }
    this.handlers.length = 0;
  }
}
/**
 * Step2: Change state and value based on succeeded result and failed result.
 * if (succeeded result || failed result is Promise) chainPromise.
 * 
 * chainPromise(promise): 
 * 1. clone current promise property to next promise.
 * 2. bind current promise to next promise fn.
 * 
 * functions: succeed(onSucceeded: Function), fail(onFailed: Function), chainPromise(promise: MyPromise)
 */
class MyPromise {
  // State machine
  STATE = {
    PENDING: 0,
    SUCCEEDED: 1,
    FAILED: 2
  }
  
  TYPE = {
    THEN: 0,
    CATCH: 1
  }

  // The initial state of the Promise object should be pending
  state = this.STATE.PENDING;

  // Store the value after success or reason after fail
  value = null;

  // This array is used to store both onSucceeded and onFailed functions in the chain call
  // { type: 'then' | 'catch', onSucceeded: fn, onFailed: fn}
  handlers = [];

  constructor(executor) {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    try {
      executor(this.resolve, this.reject);
    } catch (reason) {
      this.reject(reason);
    }
  }

  resolve(value) {
    this.resolve = () => null;
    this.state = this.STATE.SUCCEEDED;
    this.value = value;
    for (const { type, onSucceeded, onFailed } of this.handlers) {
      if (type === this.TYPE.THEN) {
        this.succeed(onSucceeded);
        if (this.state === this.STATE.FAILED) {
          return this.reject(this.value);
        }
      }
    }
    this.handlers.length = 0;
  }

  reject(reason) {
    this.reject = () => null;
    this.state = this.STATE.FAILED;
    this.value = reason;
    for (const { type, onSucceeded, onFailed } of this.handlers) {
      if (type === this.TYPE.CATCH) {
        this.fail(onFailed);
        // if (reason is catched) state is able to set to be SUCCEEDED and chain to next 'then'
        if (this.state = this.STATE.SUCCEEDED) {
          return this.resolve(this.value);
        }
      }
    }
    this.handlers.length = 0;
  }

  succeed(onSucceeded) {
    if (typeof onSucceeded !== 'function') {
      onSucceeded = () => this.value;
    }
    try {
      const succeeded_result = onSucceeded(this.value);
      if (succeeded_result instanceof MyPromise) {
        this.chainPromise(succeeded_result);
      } else {
        // Keep state as PENDING
        this.value = succeeded_result;
      }
    } catch(reason) {
      this.state = this.STATE.FAILED;
      this.value = reason;
    }
  }

  fail(onFailed) {
    if (typeof onFailed !== 'function') {
      onFailed = () => this.value;
    }
    try {
      const failed_result = onFailed(this.value);
      if (failed_result instanceof MyPromise) {
        this.chainPromise(failed_result);
      } else {
        // change state to SUCCEEDED and let future 'then' handle
        this.state = this.STATE.SUCCEEDED;
        this.value = failed_result;
      }
    } catch(reason) {
      this.state = this.STATE.FAILED;
      this.value = reason;
    }
  }
  
  chainPromise(promise) {
    this.state = promise.state;
    this.value = promise.value;
    this.handlers = promise.handlers;

    for (const key of Object.keys(MyPromise.prototype)) {
      if (typeof this[key] === 'function') {
        this[key] = this[key].bind(promise);
      }
    }
  }
}

/**
 * Step3: 'Then' and 'Catch'
 * 1. 'then': handle state(pending, succeeded, failed) in microtask queue
 * 2. 'catch': handle state(pending, failed) in microtask queue
 * If state === pending, push {type, onSucceeded, onFailed} in handlers. Let future 'then' or 'catch' to handle.
 * If state === succeeded, this.succeed(onSucceeded). Handle now.
 * If state === failed, this.fail(onFailed). Handle now.
 * 
 * functions: then(onSucceeded, onFailed) -> Promise,
 *            catch(onFailed) -> Promise
 */
class MyPromise {
  // State machine
  STATE = {
    PENDING: 0,
    SUCCEEDED: 1,
    FAILED: 2
  }
  
  TYPE = {
    THEN: 0,
    CATCH: 1
  }

  // The initial state of the Promise object should be pending
  state = this.STATE.PENDING;

  // Store the value after success or reason after fail
  value = null;

  // This array is used to store both onSucceeded and onFailed functions in the chain call
  // { type: 'then' | 'catch', onSucceeded: fn, onFailed: fn}
  handlers = [];

  constructor(executor) {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    try {
      executor(this.resolve, this.reject);
    } catch (reason) {
      this.reject(reason);
    }
  }

  resolve(value) {
    this.resolve = () => null;
    this.state = this.STATE.SUCCEEDED;
    this.value = value;
    for (const { type, onSucceeded, onFailed } of this.handlers) {
      if (type === this.TYPE.THEN) {
        this.succeed(onSucceeded);
        if (this.state === this.STATE.FAILED) {
          return this.reject(this.value);
        }
      }
    }
    this.handlers.length = 0;
  }

  reject(reason) {
    this.reject = () => null;
    this.state = this.STATE.FAILED;
    this.value = reason;
    for (const { type, onSucceeded, onFailed } of this.handlers) {
      if (type === this.TYPE.CATCH) {
        this.fail(onFailed);
        // if (reason is catched) state is able to set to be SUCCEEDED and chain to next 'then'
        if (this.state = this.STATE.SUCCEEDED) {
          return this.resolve(this.value);
        }
      }
    }
    this.handlers.length = 0;
  }

  succeed(onSucceeded) {
    if (typeof onSucceeded !== 'function') {
      onSucceeded = () => this.value;
    }
    try {
      const succeeded_result = onSucceeded(this.value);
      if (succeeded_result instanceof MyPromise) {
        this.chainPromise(succeeded_result);
      } else {
        // Keep state as PENDING
        this.value = succeeded_result;
      }
    } catch(reason) {
      this.state = this.STATE.FAILED;
      this.value = reason;
    }
  }

  fail(onFailed) {
    if (typeof onFailed !== 'function') {
      onFailed = () => this.value;
    }
    try {
      const failed_result = onFailed(this.value);
      if (failed_result instanceof MyPromise) {
        this.chainPromise(failed_result);
      } else {
        // change state to SUCCEEDED and let future 'then' handle
        this.state = this.STATE.SUCCEEDED;
        this.value = failed_result;
      }
    } catch(reason) {
      this.state = this.STATE.FAILED;
      this.value = reason;
    }
  }
  
  chainPromise(promise) {
    this.state = promise.state;
    this.value = promise.value;
    this.handlers = promise.handlers;

    for (const key of Object.keys(MyPromise.prototype)) {
      if (typeof this[key] === 'function') {
        this[key] = this[key].bind(promise);
      }
    }
  }

  then(onSucceeded, onFailed) {
    queueMicrotask(() => {
      switch (this.state) {
        case this.STATE.PENDING:
          this.handlers.push({ type: this.TYPE.THEN, onSucceeded, onFailed });
          break;
        case this.STATE.SUCCEEDED:
          this.succeed(onSucceeded);
          break;
        case this.STATE.FAILED:
          if (typeof onFailed === 'function') this.fail(onFailed);
          break;
      }
    });
    return this;
  }

  catch(onFailed) {
    queueMicrotask(() => {
      switch (this.state) {
        case this.STATE.PENDING:
          this.handlers.push({ type: this.TYPE.CATCH, onFailed });
          break;
        case this.STATE.FAILED:
          this.fail(onFailed);
          break;
      }
    });
    return this;
  }
}

/**
 * Step4: Promise.resolve(value) -> Promise, 
 *        Promise.reject(reason) -> Promise,
 *        finally(onFinally) -> Promise
 */
class MyPromise {
  // State machine
  STATE = {
    PENDING: 0,
    SUCCEEDED: 1,
    FAILED: 2
  }
  
  TYPE = {
    THEN: 0,
    CATCH: 1
  }

  // The initial state of the Promise object should be pending
  state = this.STATE.PENDING;

  // Store the value after success or reason after fail
  value = null;

  // This array is used to store both onSucceeded and onFailed functions in the chain call
  // { type: 'then' | 'catch', onSucceeded: fn, onFailed: fn}
  handlers = [];

  constructor(executor) {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    try {
      executor(this.resolve, this.reject);
    } catch (reason) {
      this.reject(reason);
    }
  }

  resolve(value) {
    this.resolve = () => null;
    this.state = this.STATE.SUCCEEDED;
    this.value = value;
    for (const { type, onSucceeded, onFailed } of this.handlers) {
      if (type === this.TYPE.THEN) {
        this.succeed(onSucceeded);
        if (this.state === this.STATE.FAILED) {
          return this.reject(this.value);
        }
      }
    }
    this.handlers.length = 0;
  }

  reject(reason) {
    this.reject = () => null;
    this.state = this.STATE.FAILED;
    this.value = reason;
    for (const { type, onSucceeded, onFailed } of this.handlers) {
      if (type === this.TYPE.CATCH) {
        this.fail(onFailed);
        // if (reason is catched) state is able to set to be SUCCEEDED and chain to next 'then'
        if (this.state = this.STATE.SUCCEEDED) {
          return this.resolve(this.value);
        }
      }
    }
    this.handlers.length = 0;
  }

  succeed(onSucceeded) {
    if (typeof onSucceeded !== 'function') {
      onSucceeded = () => this.value;
    }
    try {
      const succeeded_result = onSucceeded(this.value);
      if (succeeded_result instanceof MyPromise) {
        this.chainPromise(succeeded_result);
      } else {
        // Keep state as PENDING
        this.value = succeeded_result;
      }
    } catch(reason) {
      this.state = this.STATE.FAILED;
      this.value = reason;
    }
  }

  fail(onFailed) {
    if (typeof onFailed !== 'function') {
      onFailed = () => this.value;
    }
    try {
      const failed_result = onFailed(this.value);
      if (failed_result instanceof MyPromise) {
        this.chainPromise(failed_result);
      } else {
        // change state to SUCCEEDED and let future 'then' handle
        this.state = this.STATE.SUCCEEDED;
        this.value = failed_result;
      }
    } catch(reason) {
      this.state = this.STATE.FAILED;
      this.value = reason;
    }
  }
  
  chainPromise(promise) {
    this.state = promise.state;
    this.value = promise.value;
    this.handlers = promise.handlers;

    for (const key of Object.keys(MyPromise.prototype)) {
      if (typeof this[key] === 'function') {
        this[key] = this[key].bind(promise);
      }
    }
  }

  then(onSucceeded, onFailed) {
    queueMicrotask(() => {
      switch (this.state) {
        case this.STATE.PENDING:
          this.handlers.push({ type: this.TYPE.THEN, onSucceeded, onFailed });
          break;
        case this.STATE.SUCCEEDED:
          this.succeed(onSucceeded);
          break;
        case this.STATE.FAILED:
          if (typeof onFailed === 'function') this.fail(onFailed);
          break;
      }
    });
    return this;
  }

  catch(onFailed) {
    queueMicrotask(() => {
      switch (this.state) {
        case this.STATE.PENDING:
          this.handlers.push({ type: this.TYPE.CATCH, onFailed });
          break;
        case this.STATE.FAILED:
          this.fail(onFailed);
          break;
      }
    });
    return this;
  }

  static resolve(value) {
    return new MyPromise(resolve => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  finally(onFinally) {
    const Promise = this.constructor;
    return Promise.then(
      value =>  Promise.resolve(onFinally()).then(() => value), 
      reason => Promise.resolve(onFinally()).then(() => Promise.reject(reason))
    );
  }
}

const mp = new MyPromise((resolve, reject) => { resolve(1)})
const mp2 = new MyPromise((resolve, reject) => {
  reject(2)
})
mp.then((data) => {
  return mp2 
}).then((data) => {
}, (error) => {
  console.log(error) // 2
})

// Test cases:
// MyPromise.prototype.then should exist 

// then() should return a new Promise 

// catch() should exist 

// catch() should return a new Promise 

// new MyPromise(() => {}) 

// Promise could only be resolved once 

// Promise could only be rejected once 

// Promise could only be resolved or rejected once 

// then(onFulfilled) 

// then(onFulfilled, onRejected) 

// then(onFulfilled, onRejected) rejection handler should swallow the rejection 

// MyPromise.prototype.catch should work 

// catch() should swallow error and works like then() 

// support chaining then().then().then() 

// then() returns a resolved promise if callback returns vlue 

// then() returns a resolved promise of undefined if callback returns nothing 

// then(callback) return a promise chained to the promise(fulfilled) from callback 

// then(callback) return a promise chained to the promise(rejected) from callback 

// error in constructor should reject 

// error in fulfill handler should reject 

// constructor should be sync, then handlers should be async 

// MyPromise.resolve(1) 

// MyPromise.reject(1) 