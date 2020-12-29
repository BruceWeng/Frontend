/*
FakeTimer.callbacks: [
  { callback: func1, wait: 100, id: 1 },
  { callback: func3, wait: 100, id: 3 },
  { callback: func2, wait: 200, id: 2 },
  ...
]
*/

class FakeTimer {
  install() {
    // replace window.setTimeout, window.clearTimeout, Date.now
    // with your implementation
    this.windowSetTimeout = window.setTimeout;
    this.windowClearTimeout = window.clearTimeout;
    this.dateNow = Date.now;

    this.callbacks = [];
    this.currentTime = 0;
    this.id = 1;

    window.setTimeout = (callback, ms=0) => {
      const wait = this.currentTime + ms;

      // find index to insert to
      // index of a callback indicates the order that it will be executed
      const numPrevCallbacks = this.callbacks.reduce((count, item) => {
        return item.wait <= wait ? count + 1 : count;
      }, 0);

      // insert callback item
      const id = this.id;
      const item = { callback, wait, id };
      this.callbacks.splice(numPrevCallbacks, 0, item);

      // increment id for next item
      this.id++;

      return id;
    }

    window.clearTimeout = (id) => {
      const index = this.callbacks.findIndex((item) => {
        return item.id === id;
      });

      if (index > -1) {
        const { wait } = this.callbacks[index];
        if (wait < this.currentTime) return;
        this.callbacks.splice(index, 1);
      }
    }

    Date.now = () => {
      return this.currentTime;
    }
  }

  uninstall() {
    // restore the original implementation of
    // window.setTimeout, window.clearTimeout, Date.now
    window.setTimeout = this.windowSetTimeout;
    window.clearTimeout = this.windowClearTimeout;
    Date.now = this.dateNow;
  }

  tick() {
    // execute all callbacks in this.callbacks, from the first to the last item
    while (this.callbacks.length > 0) {
      const { callback, wait } = this.callbacks.shift();
      this.currentTime = wait;
      callback();
    }
  }
}