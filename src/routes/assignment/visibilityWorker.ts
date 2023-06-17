import { updateOutOfFocusHomework } from 'utils/db/db.utils';

/* eslint-disable no-restricted-globals */
let counter = 0;
let timerId: NodeJS.Timer;
let homeworkId: string;
let studentId: string;
let authToken: string;

self.onmessage = (event) => {
  if (event.data === 'start') {
    timerId = setInterval(() => {
      if (counter === 60) {
        updateOutOfFocusHomework(authToken, studentId, homeworkId, counter);
        counter = 0;
      } else {
        counter += 1;
      }
    }, 1000);
  } else if (event.data === 'stop') {
    if (counter > 10) {
      updateOutOfFocusHomework(authToken, studentId, homeworkId, counter);
      counter = 0;
    }
    clearInterval(timerId);
  } else {
    homeworkId = event.data.homeworkId;
    studentId = event.data.studentId;
    authToken = event.data.authToken;
  }
};

export {};
