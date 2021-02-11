/**
 * Write a Observable class.
 * 1. error and complete can only be delivered once, next/error/complete after error/complete should not work
 * 2. for a subscriber/observer object, next/error/complete callback are all optional. 
 * 3. if a function is passed as observer, it is treated as next.
 * 4. should support multiple subscription
 */
const observer = {
  next: (value) => {
     console.log('we got a value', value)
  },
  error: (error) => {
    console.log('we got an error', error)
  },
  complete: () => {
    console.log('ok, no more values')
  }
}
///////////////////////////////////////////////
class Observable {
  
  constructor(setup) {
    this.subscriber = setup; // func, sub should be passed into this function
  }
 
  subscribe(observer) {
    let isUnsubscribed = false;
    let sub = {
      unsubscribe() {
        isUnsubscribed = true;
      },
      next(value) {
        if (isUnsubscribed) return;
        // if a func is passed in as an obsever, it is treated as next
        if (observer instanceof Function) observer(value);
        if (observer.next) observer.next(value);
      },
      error(reason) {
        if (isUnsubscribed) return;
        isUnsubscribed = true;
        if (observer.error) observer.error(reason);
      },
      complete() {
        if (isUnsubscribed) return;
        isUnsubscribed = true;
        if (observer.complete) observer.complete();
      }

    }
    this.subscriber(sub);
    return sub;
  }
}

const observable = new Observable((observer)=> {
  observer.next(1)
  observer.next(2)
  setTimeout(() => {
    observer.next(3)
    observer.next(4)
    observer.complete()
  }, 100)
})

// const sub1 = observable.subscribe(observer)
// we got a value 1
// we got a value 2

// we got a value 3
// we got a value 4
// ok, no more values

const sub2 = observable.subscribe(observer)
setTimeout(() => {
  // ok we only subscribe for 50ms
  sub2.unsubscribe()
}, 50)
// we got a value 1
// we got a value 2