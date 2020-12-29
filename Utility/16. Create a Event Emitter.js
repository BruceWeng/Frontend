class EventEmitter {
  subscribers = {};
  subscribe(eventName, callback) {
  	this.subscribers[eventName] = this.subscribers[eventName] || [];
    this.subscribers[eventName].push(callback);
    const index = this.subscribers.length - 1;
    const EventEmitter = this;
    return {
      release() {
        EventEmitter.subscribers[eventName].splice(index, 1);
      }
    }
  }
  
  emit(eventName, ...args) {
  	const callbacks = this.subscribers[eventName];
    for (const callback of callbacks) {
      callback(...args);
    }
  }
}