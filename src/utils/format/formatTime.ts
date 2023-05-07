/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
export function formatTime(time: string) {
  let [hh, mm, ss] = time.split(':');

  const period = Number(hh) < 12 ? 'AM' : 'PM';

  if (hh === '00') {
    hh = '12';
  } else if (period === 'AM') {
    hh = String(Number(hh));
  } else if (hh !== '12') {
    hh = String(Number(hh) - 12);
  }

  return `${hh}:${mm} ${period}`;
}
