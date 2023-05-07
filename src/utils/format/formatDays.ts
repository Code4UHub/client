/* eslint-disable prefer-template */
import { FORMAT_DAYS, Days } from 'types/Days/Days';

export function formatDays(days: string[]) {
  return days.reduce(
    (acc, day, index) =>
      index === days.length - 1
        ? acc + `${FORMAT_DAYS[day as Days]}`
        : acc + `${FORMAT_DAYS[day as Days]}, `,
    ''
  );
}
