import {
  SubjectError,
  ClassCodeError,
  TimeError,
  DateError,
} from 'utils/errorMessage/groupErrorMessage';
import { correctState, generalRules } from './generalRules';

const inputsMinLength = {
  classCode: 4,
};

const inputsMaxLength = {
  classCode: 8,
};

type InputRule = {
  id: string;
  validate: Function;
};

function isValidSubject(value: string | { id: number; name: string }) {
  if (typeof value === 'string') {
    const trimmedValue = value.trim();
    if (trimmedValue.length === 0) return SubjectError.empty;

    return SubjectError.noOption;
  }

  if (value.name === '') return SubjectError.empty;

  return correctState;
}

function isValidClasscode(value: string) {
  const splittedString = value.split(' ');
  if (splittedString.length > 1) return ClassCodeError.whitespace;

  return correctState;
}

function isValidStartTime(value: string) {
  if (!value) return TimeError.empty;

  return correctState;
}

function isValidEndTime(value: string, startTime: string) {
  if (!value) return TimeError.invalid;

  if (!startTime) return TimeError.noStartTime;

  const [startHour, startMinutes] = startTime.split(':');
  const [endHour, endMinutes] = value.split(':');

  if (
    Number(startHour) > Number(endHour) ||
    (Number(startHour) === Number(endHour) &&
      Number(startMinutes) >= Number(endMinutes))
  )
    return TimeError.invalid;

  return correctState;
}

function isEndDateValid(value: string) {
  if (!value) return DateError.empty;

  const timestamp = Date.now();
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);

  const [selectedYear, selectedMonth, selectedDate] = value.split('-');

  const valueDate = new Date(
    Number(selectedYear),
    Number(selectedMonth) - 1,
    Number(selectedDate)
  );

  if (date >= valueDate) return DateError.endTimeGreater;

  return correctState;
}

function runGeneralRules(idInput: string, inputValue: string) {
  const generalResults = generalRules(
    inputValue,
    idInput,
    inputsMinLength,
    inputsMaxLength
  );
  if (generalResults === correctState) {
    if (idInput === 'classCode') {
      return isValidClasscode(inputValue);
    }
  }
  return generalResults;
}

export const inputRules: InputRule[] = [
  {
    id: 'subject',
    validate: isValidSubject,
  },
  {
    id: 'classCode',
    validate: (value: string) => runGeneralRules('classCode', value),
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
