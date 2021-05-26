class EventEmitter {
  subscribers = {}; // <key: eventName, value: callbacks[]>
  subscribe(eventName, callback) { // Consumer
  	this.subscribers[eventName] = this.subscribers[eventName] || [];
    this.subscribers[eventName].push(callback);
    const index = this.subscribers.length-1;
    const EventEmitter = this;
    return {
      release() {
        EventEmitter.subscribers[eventName].splice(index, 1);
      }
    }
  }
  
  emit(eventName, ...args) { // Producer
  	const callbacks = this.subscribers[eventName];
    for(const callback of callbacks) {
      callback(...args);
    }
  }
}
const emitter = new EventEmitter();
const sum = (a, b) => {
  console.log(a + b);
}
const sub1  = emitter.subscribe('event1', sum)
const sub2 = emitter.subscribe('event2', sum)

// same callback could subscribe 
// on same event multiple times
const sub3 = emitter.subscribe('event1', sum)

emitter.emit('event1', 1, 2); // 3 3
// callback1 will be called twice

sub1.release()
sub3.release()
// now even if we emit 'event1' again, 
// callback1 is not called anymore
emitter.emit('event1', 1, 2); // no value
