import {
  SubjectError,
  ClassCodeError,
  TimeError,
} from 'utils/errorMessage/groupErrorMessage';
import { correctState } from 'utils/inputRules/generalRules';
import { inputRules, isValidEndTime } from 'utils/inputRules/createClassRules';

describe('isValidClasscode', () => {
  test('Whitespace in class code', () => {
    const result = inputRules
      .find((rule) => rule.id === 'class_id')
      ?.validate('CS 101');
    expect(result).toBe(ClassCodeError.whitespace);
  });

  test('Valid class code', () => {
    const result = inputRules
      .find((rule) => rule.id === 'class_id')
      ?.validate('CS101');
    expect(result).toBe(correctState);
  });
});

describe('isValidSubject', () => {
  test('Empty subject (string)', () => {
    const result = inputRules
      .find((rule) => rule.id === 'subject')
      ?.validate('');
    expect(result).toBe(SubjectError.empty);
  });

  test('No option (string)', () => {
    const result = inputRules
      .find((rule) => rule.id === 'subject')
      ?.validate('English');
    expect(result).toBe(SubjectError.noOption);
  });

  test('Empty subject (object)', () => {
    const subject = { id: '1', name: '' };
    const result = inputRules
      .find((rule) => rule.id === 'subject')
      ?.validate(subject);
    expect(result).toBe(SubjectError.empty);
  });

  test('Valid subject', () => {
    const subject = { id: '1', name: 'Math' };
    const result = inputRules
      .find((rule) => rule.id === 'subject')
      ?.validate(subject);
    expect(result).toBe(correctState);
  });
});
describe('isValidStartTime', () => {
  test('Empty start time', () => {
    const result = inputRules
      .find((rule) => rule.id === 'start_time')
      ?.validate('');
    expect(result).toBe(TimeError.empty);
  });

  test('Valid start time', () => {
    const result = inputRules
      .find((rule) => rule.id === 'start_time')
      ?.validate('09:00');
    expect(result).toBe(correctState);
  });
});

describe('isValidEndTime', () => {
  test('Empty end time', () => {
    const result = inputRules
      .find((rule) => rule.id === 'end_time')
      ?.validate('', '10:00');
    expect(result).toBe(TimeError.invalid);
  });

  test('No start time', () => {
    const result = inputRules
      .find((rule) => rule.id === 'end_time')
      ?.validate('12:00', '');
    expect(result).toBe(TimeError.noStartTime);
  });

  test('Invalid end time', () => {
    const result = isValidEndTime('08:00', '09:00');
    expect(result).toBe(TimeError.invalid);
  });

  test('Valid end time', () => {
    const result = inputRules
      .find((rule) => rule.id === 'end_time')
      ?.validate('10:30', '10:00');
    expect(result).toBe(correctState);
  });
});
