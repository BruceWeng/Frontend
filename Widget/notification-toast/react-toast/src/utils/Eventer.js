class Eventer {
  _events = {}
  
  on(evtName, callback) {
    if (!this._events[evtName]) {
      this._events[evtName] = []
    }

    this._events[evtName].push(callback)
  }

  trigger(evtName, data) {
    if (!this._events[evtName]) { return }

    this._events[evtName].forEach(evt => evt.call(this, data) )
  }
}

export default new Eventer()
