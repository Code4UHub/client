export function formatAssignmentTimer(time_created: number) {
  const timePassed = Date.now() - time_created;

  return Number((timePassed / 1000).toFixed(0));
}
