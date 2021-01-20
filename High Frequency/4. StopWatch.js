class StopWatch {
  constructor() {
    this.startAt = 0; // last time startAt
    this.lastStopTime = 0;
    this.now = () => new Date().getTime();
  }

  start() { // update startAt
    this.startAt = this.startAt !== 0 
      ? this.startAt 
      : this.now();
  }

  stop() { // update lastStopTime && reset startAt
    this.lastStopTime = this.startAt !== 0 
      ? this.lastStopTime + this.now() - this.startAt 
      : this.lastStopTime;
    this.startAt = 0;
  }

  reset() { // reset startAt && lastStopTime
    this.startAt = 0;
    this.lastStopTime = 0;
  }

  duration() { // update and return lastStopTime
    this.lastStopTime = this.startAt !== 0 
      ? this.lastStopTime + this.now() - this.startAt 
      : this.lastStopTime;
    return this.lastStopTime;
  }
}

let test = new StopWatch();

test.start();
setInterval(function() {
  test.stop();
  console.log(test.duration());
  test.start();
}, 1000);
