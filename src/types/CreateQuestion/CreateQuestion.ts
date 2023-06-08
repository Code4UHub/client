import { TypePromise } from 'types/TypePromise/TypePromise';

export type TestCase = {
  input: string;
  output: string;
};

export type QuestionOption = {
  option: string;
  explanation: string;
};

export interface CreateQuestion {
  type: 'closed' | 'open';
  module_id: number;
  difficulty_id: number;
  question: {
    id: string;
    author: string;
    title: string;
    description: string;
    topic: string;
    difficulty: string;
    answer: number;
    hints: true;
    options: QuestionOption[] | TestCase[];
  };
}

export interface CreateQuestionPromise extends TypePromise<string> {}
