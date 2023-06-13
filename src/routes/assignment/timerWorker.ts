/* eslint-disable no-restricted-globals */
let timerId: NodeJS.Timer;

self.onmessage = (event) => {
  if (event.data === 'start') {
    timerId = setInterval(() => {
      self.postMessage('update');
    }, 1000);
  } else if (event.data === 'stop') {
    clearTimeout(timerId);
  }
};

export {};
