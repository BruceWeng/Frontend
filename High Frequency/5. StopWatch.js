class StopWatch {
  constructor() {
    this.start_at = 0;
    this.last_stop_time = 0;
  }
  
  start() {
    if(this.start_at===0) this.start_at = new Date().getTime();
  }
  
  stop() {
    if(this.start_at!==0) {
      this.last_stop_time += new Date().getTime()-this.start_at;
      this.start_at = 0;
    }
  }
  
  reset() {
    this.start_at = 0;
    this.last_stop_time = 0;
  }
  
  duration() {
    if(this.start_at!==0) {
      this.last_stop_time += new Date().getTime()-this.start_at;
    }
    return this.last_stop_time;
  }
}

let test = new StopWatch();

test.start();
setInterval(function() {
  test.stop();
  console.log(test.duration());
  test.start();
}, 1000);
