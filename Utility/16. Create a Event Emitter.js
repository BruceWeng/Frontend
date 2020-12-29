class EventEmitter {
  subscribers = {};
  subscribe(eventName, callback) {
  	this.subscribers[eventName] = this.subscribers[eventName] || [];
    this.subscribers[eventName].push(callback);
    const index = this.subscribers.length - 1;
    const event_emitter = this;
    return {
      release() {
        event_emitter.subscribers[eventName].splice(index, 1);
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