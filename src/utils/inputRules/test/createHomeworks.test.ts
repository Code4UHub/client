import {
  ClassError,
  NumberError,
} from 'utils/errorMessage/homeworkErrorMessage';
import { GeneralError } from 'utils/errorMessage/generalErrorMessage';
import { correctState } from 'utils/inputRules/generalRules';
import { DateError } from 'utils/errorMessage/groupErrorMessage';
import {
  inputsMaxLength,
  createHomeworkRules,
  checkDeadline,
  checkClass,
  numberOfQuestions,
} from '../createHomeworkRules';

const homeMax = inputsMaxLength.title;
const maxSizeMessage = `${GeneralError.maxCharError} ${homeMax} char`;
describe('Class title validation', () => {
  test('Valid title', () => {
    expect(createHomeworkRules.title('title')).toBe(correctState);
    expect(createHomeworkRules.title('titletwo')).toBe(correctState);
  });

  test('Exceeds max length', () => {
    expect(
      createHomeworkRules.title(
        '84759238475923847592384759238475923847592384759238473'
      )
    ).toBe(maxSizeMessage);
    expect(
      createHomeworkRules.title(
        '84759238475923847592384759238475923847592384759238479'
      )
    ).toBe(maxSizeMessage);
  });

  test('Under min length', () => {
    expect(createHomeworkRules.title('')).toBe(GeneralError.noEmpty);
  });

  describe('checkDeadline', () => {
    test('Current date greater than or equal to deadline', () => {
      const pastDate = '2022-01-03';
      const result = checkDeadline(pastDate);
      expect(result).toBe(DateError.endTimeGreater);
    });

    test('Empty deadline', () => {
      const result = checkDeadline('');
      expect(result).toBe(DateError.empty);
    });

    test('Current date is less than deadline', () => {
      const futureDate = '2024-01-01';
      const result = checkDeadline(futureDate);
      expect(result).toBe(correctState);
    });
  });

  describe('checkClass', () => {
    test('Invalid class_id type', () => {
      const classId = { id: '1', value: 'Python' };
      const result = checkClass(classId);
      expect(result).toBe(correctState);
    });

    test('Valid class_id, general rule failed', () => {
      const classId = '1234567890';
      const result = checkClass(classId);
      expect(result).toBe(ClassError.noOption);
    });

    test('Valid class_id, general rule passed', () => {
      const classId = { id: 'CS101', value: 'OOP' };
      const result = checkClass(classId);
      expect(result).toBe(correctState);
    });
    test('Valid class_id, general  rule no passed', () => {
      const classId = 'CS101';
      const result = checkClass(classId);
      expect(result).toBe(ClassError.noOption);
    });
  });

  describe('numberOfQuestions', () => {
    test('Undefined questions', () => {
      expect(numberOfQuestions(undefined as unknown as number)).toBe(
        NumberError.empty
      );
    });

    test('Negative questions', () => {
      const questions = -5;
      const result = numberOfQuestions(questions);
      expect(result).toBe(NumberError.noNegatives);
    });

    test('Decimal questions', () => {
      const questions = 3.5;
      const result = numberOfQuestions(questions);
      expect(result).toBe(NumberError.noDecimal);
    });

    test('Exceeds maximum questions', () => {
      const questions = 10;
      const result = numberOfQuestions(questions);
      expect(result).toBe(NumberError.max);
    });

    test('Valid number of questions', () => {
      const questions = 3;
      const result = numberOfQuestions(questions);
      expect(result).toBe(correctState);
    });
  });
});
