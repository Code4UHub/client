import { TypePromise } from 'types/TypePromise/TypePromise';

// TODO: Define Difficulty type
export type Difficulty = 'Fácil' | 'Medio' | 'Difícil';

export interface Question {
  id: string;
  author: string;
  title: string;
  description: string;
  topic: string;
  difficulty: Difficulty;
}

interface QuestionData {
  id: string;
  author: string;
  title: string;
  description: string;
  topic: string;
  difficulty: string;
}

interface OpenQuestion extends QuestionData {
  tests: { input: any[]; output: any }[];
  driver: string;
}

interface ClosedQuestion extends QuestionData {
  answer: number;
  hints: boolean;
  options: { text: string; explanation: string }[];
}

interface HomeworkQuestionBase {
  question_h_id: number;
  difficulty_id: 1 | 2 | 3;
}

export interface OpenHomeworkQuestion extends HomeworkQuestionBase {
  type: 'open';
  question: OpenQuestion;
}

export interface ClosedHomeworkQuestion extends HomeworkQuestionBase {
  type: 'closed';
  question: ClosedQuestion;
}

export type HomeworkQuestion = OpenHomeworkQuestion | ClosedHomeworkQuestion;

export type HomeworkQuestionList = HomeworkQuestion[];

export interface HomeworkQuestionListPromise
  extends TypePromise<HomeworkQuestionList> {}
