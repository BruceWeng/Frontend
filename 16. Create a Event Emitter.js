class EventEmitter {
  callbacks = {};
  map = new WeakMap(); // WeakMap is used when using object as key. When object is deleted, object key in WeakMap will also be garbage collected.
  subscribe(eventName, callback) {
    this.callbacks[eventName] = this.callbacks[eventName] || [];
    this.callbacks[eventName].push(callback);
    this.map.set(callback, this.callbacks[eventName].length-1);
    const emitter = this;
    return {
      release() {
        if (emitter.map.has(callback)) {
          emitter.callbacks[eventName].splice(emitter.map.get(callback), 1);
          emitter.map.delete(callback);
        }
      }
    };
  }

  emit(eventName, ...args) {
    const cbs = this.callbacks[eventName] || [];
    for (const c of cbs) {
      c(...args);
    }
  }
}