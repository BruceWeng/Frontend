class FakeTimer {
  tasks = [];
  time = 0;
  install() {
    // replace window.setInterval, window.clearInterval, Date.now
    // with your implementation
    this.originSetInterval = window.setInterval;
    this.originClearInterval = window.clearInterval;
    this.originDateNow = Date.now;

    window.setInterval = (fn, delay) => {
      const wait = delay + this.time;
      const obj = {
        fn,
        delay,
        date: delay,
      };
      this.tasks.push(obj);
      this.tasks = this.tasks.sort((a, b) => a.delay - b.delay);
      return obj;
    }

    window.clearInterval = ({
      fn,
      delay,
    }) => {
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
        if (task.fn === fn && task.delay === delay) {
          this.tasks.splice(i, 1);
        }
      }
    }

    Date.now = () => {
      return this.time;
    }
  }

  uninstall() {
    // restore the original implementation of
    // window.setInterval, window.clearInterval, Date.now
    window.setInterval = this.originSetInterval;
    window.clearInterval = this.originClearInterval;
    Date.now = this.originDateNow;
  }

  tick() {
    // run the scheduled functions without waiting
    while (this.tasks.length) {
      const obj = this.tasks.shift();
      this.time = obj.date;
      this.tasks.push({
        ...obj,
        date: this.time + obj.delay,
      });
      this.tasks = this.tasks.sort((a, b) => a.delay - b.delay);
      (obj.fn)();
    }
  }
}