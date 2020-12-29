/**
 * cancel all timer from window.setTimeout
 */
window.timers = [];
window.originalSetTimeout = window.setTimeout;

window.setTimeout = function(callback, delay) {
  const timer = window.originalSetTimeout(callback, delay);
  window.timers.push(timer);
  return timer;
};

function clearAllTimeout() {
  window.timers.forEach(t => window.clearTimeout(t));
}