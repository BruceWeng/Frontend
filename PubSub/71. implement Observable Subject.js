/**
 * Plain Observables are unicast, meaning every subscription is independent. 
 * To create multicast, you need to use Subject.
 * 1. Observable is given for you, you can just use it.
 * 2. you can use new Observer({next,error,complete}) or new Observer(function) 
 *    to create an observer.
 */
// default behavior with plain Observable
const observable = from([1,2,3])
observable.subscribe(console.log)
observable.subscribe(console.log)
// 1
// 2
// 3
// 1
// 2
// 3
// with Subject, it works like Event Listeners in DOM world.
const subject = new Subject()
subject.subscribe(console.log)
subject.subscribe(console.log)

const observable = from([1, 2, 3])
observable.subscribe(subject)

// 1
// 1
// 2
// 2
// 3
// 3
// Now the logs are different! That is because Subject first works as a observer, 
// get the values, then works as an Observable and dispatch the value to different observers.

// You can use Observer which is bundled to your code

// class Observer {
//   // subscriber could one next function or a handler object {next, error, complete}
//   constructor(subscriber) { }
//   next(value) { }
//   error(error) { }
//   complete() {}
// }


class Subject {
  subscribers = new Set();
  hasCompleted = false;
  constructor() {
    this.next = this.next.bind(this);
    this.error = this.error.bind(this);
    this.complete = this.complete.bind(this);
  }
  subscribe(subscriber) {
    if (this.hasCompleted) return;
    const observer = new Observer(subscriber);
    this.subscribers.add(observer);
    return {
      unsubscribe: () => {
        this.subscribers.delete(observer);
      }
    }
  }

  next(value) {
    for (const subscriber of this.subscribers) subscriber.next(value);
  }

  error(reason) {
    for (const subscriber of this.subscribers) subscriber.error(reason);
    this.hasCompleted = true;
  }

  complete() {
    for (const subscriber of this.subscribers) subscriber.complete();
    this.hasCompleted = true;
  }
}