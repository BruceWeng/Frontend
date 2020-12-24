class BrowserHistory {
  history = [];
  current_index = -1;
  /**
   * @param {string} url
   * if url is set, it means new tab with url
   * otherwise, it is empty new tab
   */
  constructor(url) {
    this.visit(url);
  }
  /**
   * @param { string } url
   */
  visit(url) {
    if (this.history.length > 0) this.history = this.history.slice(0, this.current_index + 1);
    this.history.push(url);
    this.current_index = this.history.length - 1;
  }

  /**
   * @return {string} current url
   */
  get current() {
    if (this.current_index > -1) return this.history[this.current_index];
  }

  // go to previous entry
  goBack() {
    if (this.current_index > 0) this.current_index--;
  }

  // go to next visited url
  forward() {
    if (this.current_index > -1 
      && this.current_index + 1 < this.history.length
    ) this.current_index++;
  }
}

let history = new BrowserHistory('a');
history.visit('b');
history.visit('c');
history.goBack();
history.visit('d');
console.log(history.history);