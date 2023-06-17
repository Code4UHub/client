import {
  ClassError,
  NumberError,
} from 'utils/errorMessage/homeworkErrorMessage';
import { DateError } from 'utils/errorMessage/groupErrorMessage';
import { correctState, generalRules } from './generalRules';

const inputsMinLength = {
  title: 0,
  class_id: 0,
};
export const inputsMaxLength = {
  title: 50,
  class_id: Number.MAX_VALUE,
};

export function checkTitle(title: string) {
  const generalResults = generalRules(
    title,
    'title',
    inputsMinLength,
    inputsMaxLength
  );

  return generalResults;
}

export function checkClass(class_id: string | { id: string; value: string }) {
  if (typeof class_id !== 'string') return correctState;

  const generalResults = generalRules(
    class_id,
    'title',
    inputsMinLength,
    inputsMaxLength
  );

  if (generalResults === correctState) {
    return ClassError.noOption;
  }

  return generalResults;
}

export function checkDeadline(deadline: string) {
  if (!deadline) return DateError.empty;

  const timestamp = Date.now();
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);

  const [selectedYear, selectedMonth, selectedDate] = deadline.split('-');

  const valueDate = new Date(
    Number(selectedYear),
    Number(selectedMonth) - 1,
    Number(selectedDate)
  );

  if (date >= valueDate) return DateError.endTimeGreater;

  return correctState;
}

export function numberOfQuestions(questions: number) {
  if (questions === undefined) return NumberError.empty;

  if (questions < 0) return NumberError.noNegatives;

  if (questions % 1 !== 0) return NumberError.noDecimal;

  if (questions > 5) return NumberError.max;

  return correctState;
}

export const createHomeworkRules: { [key: string]: Function } = {
  title: checkTitle,
  class_id: checkClass,
  deadline: checkDeadline,
  open_questions: numberOfQuestions,
  closed_questions: numberOfQuestions,
};
