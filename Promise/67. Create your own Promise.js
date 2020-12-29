/**
 * Step1: Executor
 * We know that when you create a Promise instance, we need to pass in an executor function. 
 * The executor function should take two function arguments: the resolve function and the reject 
 * function. When the resolve function is invoked, the promise instance becomes resolved. If the 
 * executor function performs an exception, the reject function should be called, and the state 
 * of the Promise instance will be rejected.
 */
class MyPromise {
  constructor(executor) {
    // State machine
    this.STATE = {
      PENDING: 0,
      RESOLVED: 1,
      REJECTED: 2
    }

    // The initial state of the Promise object should be pending
    this.status = this.STATE.PENDING;

    // Store the value after success or reason after fail
    this.value = null;

    // Define a resolve function
    const resolve = result => {
      // If the state of a Promise instance has changed before, it should not be changed
      if (this.status !== this.STATE.PENDING) return;
      this.status = this.STATE.RESOLVED;
      this.value = result;
    }

    // Define a reject function 
    const reject = reason => {
      // If the state of a Promise instance has changed before, it should not be changed
      if (this.status !== this.STATE.PENDING) return;
      this.status = this.STATE.REJECTED;
      this.value = reason;
    }

    try {
      executor(resolve, reject);
    } catch (reason) {
      reject(reason);
    }
  }
}

/**
 * Step2: Then
 * Next, let’s write the .then method for the MyPromise. The then method should have two function 
 * arguments, the first will be executed after the Promise succeeds and the second will be executed 
 * after the Promise fails.
 * 
 * At the same time, the .then method supports chain calls, which return an promise instance after 
 * each execution.
 * 
 * Step2.1: Catch
 * The .catch method is used to catch exceptions. It is the same as the second callback function for 
 * the .then method.
 * 
 * Step2.2: static Promise.resolve and Promise.reject
 * We know thePromise.resolve(…) method is to return an instance of a Promise with a resolved state 
 * and the Promise.reject(…) method is to return an instance of a Promise with a rejected state.
 * 
 * Step2.3: Finally
 * The finally() method returns a Promise. When the promise is settled, i.e either fulfilled or rejected, 
 * the specified callback function is executed. This provides a way for code to be run whether 
 * the promise was fulfilled successfully or rejected once the Promise has been dealt with.
 */
class MyPromise2 {
  constructor(executor) {
    // State machine
    this.STATE = {
      PENDING: 0,
      RESOLVED: 1,
      REJECTED: 2
    }

    // The initial state of the Promise object should be pending
    this.status = this.STATE.PENDING;

    // Store the value after success or reason after fail
    this.value = null;

    // This array is used to store all onResolve functions in the chain call
    this.onResolves = [];

    // This array is used to store all onReject functions in the chain call
    this.onRejects = [];

    // Because the resolve function and the reject function share a lot of common code logic,
    // the common logic is written as a seperate change function
    const change = (status, value) => {
      if (this.status !== this.STATE.PENDING) return;
      this.status = status;
      this.value = value;

      // The handlers are selecter based on the current state of the Promise
      const handlers = status === this.STATE.RESOLVED ? this.onResolves : this.onRejects;

      // Call the functions of handlers
      handlers.forEach(handler => {
        // Return if no handlers
        if (typeof handler !== 'function') return;
        handler(this.value);
      });
    }

    // Define a resolve function
    const resolve = result => {
      change(this.STATE.RESOLVED, result);
    }

    // Define a reject function 
    const reject = reason => {
      change(this.STATE.REJECTED, reason);
    }

    try {
      executor(resolve, reject);
    } catch (reason) {
      reject(reason);
    }
  }

  then(onResolve, onReject) {
    // If the two args passed in are not functions, the result is returned directly
    if (typeof onResolve !== 'function') {
      onResolve = result => result;
    }

    if (typeof onReject !== 'function') {
      // Implement the static reject method later
      onReject = reason => MyPromise2.reject(reason);
    }

    return new MyPromise2((resolve, reject) => {
      this.onResolves.push(result => {
        try {
          // Get result after the promise is successed
          let value = onResolve(result);
          console.log(value)
          // If value is an instance of a promise, continue to call the `.then` method
          if (value instanceof MyPromise2) {
            value.then(resolve, reject);
            return;
          }
          resolve(value);
        } catch (reason) {
          reject(reason);
        }
      });

      this.onRejects.push(reason => {
        try {
          // Get reason after the promise is failed
          let value = onReject(reason);

          if (value instanceof MyPromise2) {
            value.then(resolve, reject);
            return;
          }
          resolve(value);
        } catch (reason) {
          reject(reason);
        }
      })
    });
  }

  catch(onReject) {
    return this.then(null, onReject);
  }

  static resolve(result) {
    return new MyPromise2(resolve => resolve(result));
  }

  static reject(reason) {
    return new MyPromise2((_, reject) => reject(reason));
  }

  finally(onFinally) {
    let Promise = this.constructor;
    return Promise.then(
      value =>  Promise.resolve(onFinally()).then(() => value), 
      reason => Promise.resolve(onFinally()).then(() => Promise.reject(reason))
    );
  }
}

var p1 = new MyPromise2((resolve, reject) => {
  resolve('Success!');
  // or
  // reject(new Error("Error!"));
});

console.log(p1)
console.log(p1.then(value => {
  console.log(value); // Success!
}, reason => {
  console.error(reason); // Error!
}));



// Your previous Plain Text content is preserved below:

class MyPromise {
  constructor(executor) {
    // State machine
    this.STATE = {
      PENDING: 0,
      RESOLVED: 1,
      REJECTED: 2
    }

    // The initial state of the Promise object should be pending
    this.status = this.STATE.PENDING;

    // Store the value after success or reason after fail
    this.value = null;

    // This array is used to store all onResolve functions in the chain call
    this.onResolves = [];

    // This array is used to store all onReject functions in the chain call
    this.onRejects = [];

    
    
    // { type: 'catch' | 'then', handler: fn}
    this.handlers = [];
    
    
    
    
    // Because the resolve function and the reject function share a lot of common code logic,
    // the common logic is written as a seperate change function
    const change = (status, value) => {
      if (this.status !== this.STATE.PENDING) return;
      this.status = status;
      this.value = value;

      // The handlers are selecter based on the current state of the Promise
      // const handlers = status === this.STATE.RESOLVED ? this.onResolves : this.onRejects;

      // Call the functions of handlers
//       handlers.forEach(handler => {
//         // Return if no handlers
//         if (typeof handler !== 'function') return;
//         try {
//           handler(this.value);
//           // set status
//         } catch(err) {
          
//           // set status to rejected
//         }
//       });  
      console.log(this.handlers);
      for (let i = 0; i < this.handlers.length; i++) {
        console.log(this.handlers[i].type, this.status);
        if (this.status) {
          try {
            this.value = this.handlers[i].handler(this.value);
            this.status = this.STATE.RESOLVED;
          } catch(error) {
            this.value = error;
            this.status = this.STATE.REJECTED;
          }
        }
      }
      
      this.handlers = [];
    }

    // Define a resolve function
    const resolve = result => {
      change(this.STATE.RESOLVED, result);
    }

    // Define a reject function 
    const reject = reason => {
      change(this.STATE.REJECTED, reason);
    }

    try {
      setTimeout(() => executor(resolve, reject));
    } catch (reason) {
      reject(reason);
    }
  }
  
  count = 0;

  then(onResolve, onReject) {
    // If the two args passed in are not functions, the result is returned directly
//     if (typeof onResolve !== 'function') {
//       onResolve = result => result;
//     }

//     if (typeof onReject !== 'function') {
//       // Implement the static reject method later
//       onReject = reason => MyPromise.reject(reason);
//     }
    
    const that = this;
    
//       this.onResolves.push(onResolve);
    
//       this.onRejects.push(onReject)
    
    if(onResolve) {
      this.handlers.push({
        type: this.STATE.RESOLVED,
        handler: onResolve
      });
    }
    
    //console.log(this.count++, onReject);
    if (onReject) {
      this.handlers.push({
        type: this.STATE.REJECTED,
        handler: onReject
      });
    }

    if (this.status === this.STATE.PENDING) {
      return this;
    } else {
      return new MyPromise((resolve, reject) => {      
        try {
          resolve(onResolve(that.value));
        } catch(err){
          reject(onReject(err));
        }
      });
    }
  }

  catch(onReject) {
    return this.then(null, onReject);
  }

  static resolve(result) {
    return new MyPromise(resolve => resolve(result));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  finally(onFinally) {
    let Promise = this.constructor;
    return Promise.then(
      value =>  Promise.resolve(onFinally()).then(() => value), 
      reason => Promise.resolve(onFinally()).then(() => Promise.reject(reason))
    );
  }
}

var p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('this is me'));
   //resolve('Success!');
  // or
  // reject(new Error("Error!"));
}).then((v) => {throw new Error('lolol');})
.catch(err => {
   console.log(err.message);
  
  //throw err;
   return 'I am returned from catch';
})
.then(v => console.log('this is then', v), err => console.log(err.message));


// console.log(p1)
// console.log(p1.then(value => {
//   // throw new Error('lol');
//   console.log(value); // Success!
// }, reason => {
//   console.error(reason); // Error!
// }));
 
// const p2 = MyPromise.resolve(3);
// const p3 = p2.then(v => {throw new Error('lol im a error');}).then(v => console.log(`wth ${v}`), err => console.log(err.message));
// console.log('promise object', p2);