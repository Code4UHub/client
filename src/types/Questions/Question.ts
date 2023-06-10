import { TypePromise } from 'types/TypePromise/TypePromise';

// TODO: Define Difficulty type
export type Difficulty = 'Fácil' | 'Medio' | 'Difícil';
export type QuestionDifficulty = 1 | 2 | 3;
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

export interface OpenQuestion extends QuestionData {
  tests: { input: any[]; output: any }[];
  driver: string;
}

export interface ClosedQuestion extends QuestionData {
  answer: number;
  hints: boolean;
  options: { text: string; explanation: string }[];
}

export type CachedCodeQuestion = {
  isCorrect: boolean;
  code: string;
};

interface HomeworkQuestionBase {
  question_h_id: number;
  difficulty_id: QuestionDifficulty;
  module_id: number;
  title: string;
  solution: {
    user_input?: number | CachedCodeQuestion;
  };
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
