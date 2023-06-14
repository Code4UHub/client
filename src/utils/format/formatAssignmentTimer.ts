export function formatAssignmentTimer(
  time_created: number,
  time_finished?: number
) {
  let timePassed: number;

  if (time_finished) {
    timePassed = time_finished - time_created;
  } else {
    timePassed = Date.now() - time_created;
  }

  return Number((timePassed / 1000).toFixed(0));
}
