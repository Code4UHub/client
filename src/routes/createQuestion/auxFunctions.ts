import { QuestionOption, TestCase } from 'types/CreateQuestion/CreateQuestion';

import { createQuestionInputData } from './createQuestionData';

export type InputType = {
  [key: string]: string | { id: string; value: string };
};

export type QuestionHeaderType = 'input' | 'output' | 'option' | 'explanation';

export const INITIAL_INPUT_VALUES = createQuestionInputData.reduce(
  (acc: InputType, element) => {
    const { id } = element;
    if (id === 'subject' || id === 'module' || id === 'difficulty') {
      acc[id] = { id: '', value: '' };
    } else if (id === 'questionType') {
      acc[id] = 'mcq';
    } else {
      acc[id] = '';
    }
    return acc;
  },
  {}
);

export const avoidReferenceObjects = (object: any) =>
  JSON.parse(JSON.stringify(object));

export const emptyQuestionOption: QuestionOption = {
  option: '',
  explanation: '',
};

export const emptyTestCase: TestCase = {
  input: '',
  output: '',
};
