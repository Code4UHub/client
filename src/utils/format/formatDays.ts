import { FORMAT_DAYS, Days } from 'types/Days/Days';

export function formatDays(days: string[]) {
  return days.reduce((acc, day, index) =>
    index === days.length - 1
      ? `${FORMAT_DAYS[day as Days]}`
      : `${FORMAT_DAYS[day as Days]}, `
  );
}
