export const correctState = 'Hecho';

type InputRule = {
  id: string;
  validate: Function;
};

function isValidSubject(value: string | { id: number; name: string }) {
  if (typeof value === 'string') {
    const trimmedValue = value.trim();
    if (trimmedValue.length === 0) return 'Campo Vacío';

    return 'Selecciona una opcion de la lista';
  }

  if (value.name === '') return 'Campo Vacío';

  return correctState;
}

function isValidClasscode(value: string) {
  const splittedString = value.split(' ');
  if (splittedString.length > 1) return 'Sin espacios';

  if (!splittedString[0]) return 'Campo Vacío';

  return correctState;
}

function isValidStartTime(value: string) {
  if (!value) return 'Campo incompleto';

  return correctState;
}

function isValidEndTime(value: string, startTime: string) {
  if (!value) return 'Campo incompleto';

  if (!startTime) return 'Introduce la hora de inicio';

  const [startHour, startMinutes] = startTime.split(':');
  const [endHour, endMinutes] = value.split(':');

  if (
    Number(startHour) > Number(endHour) ||
    (Number(startHour) === Number(endHour) &&
      Number(startMinutes) >= Number(endMinutes))
  )
    return 'Introduce un horario válido';

  return correctState;
}

function isEndDateValid(value: string) {
  if (!value) return 'Campo incompleto';

  const timestamp = Date.now();
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);

  const [selectedYear, selectedMonth, selectedDate] = value.split('-');

  const valueDate = new Date(
    Number(selectedYear),
    Number(selectedMonth) - 1,
    Number(selectedDate)
  );

  if (date >= valueDate)
    return 'La fecha de fin debe ser mayor a la fecha actual';

  return correctState;
}

export const inputRules: InputRule[] = [
  {
    id: 'subject',
    validate: isValidSubject,
  },
  {
    id: 'classCode',
    validate: isValidClasscode,
  },
  {
    id: 'startTime',
    validate: isValidStartTime,
  },
  {
    id: 'endTime',
    validate: isValidEndTime,
  },
  {
    id: 'endDate',
    validate: isEndDateValid,
  },
];
