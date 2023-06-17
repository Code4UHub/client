export enum Days {
  MONDAY = 'LU',
  TUESDAY = 'MA',
  WEDNESDAY = 'MI',
  THURDAY = 'JU',
  FRIDAY = 'VI',
}

export const FORMAT_DAYS = {
  [Days.MONDAY]: 'Lunes',
  [Days.TUESDAY]: 'Martes',
  [Days.WEDNESDAY]: 'Miércoles',
  [Days.THURDAY]: 'Jueves',
  [Days.FRIDAY]: 'Viernes',
};

export const days: string[] = [
  Days.MONDAY,
  Days.TUESDAY,
  Days.WEDNESDAY,
  Days.THURDAY,
  Days.FRIDAY,
];
