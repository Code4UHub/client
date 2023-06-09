import { TypePromise } from 'types/TypePromise/TypePromise';
import { HomeworkQuestionList } from 'types/Questions/Question';

export type HomeworkRequest = {
  class_id: string | { id: string; value: string };
  difficulty_id: 1 | 2 | 3;
  title: string;
  open_questions: number | undefined;
  closed_questions: number | undefined;
  deadline: string;
  questions: HomeworkQuestionList;
};

export type Homework = {
  homework_id: number;
  class_id: string;
  difficulty_id: number;
  title: string;
  open_questions: number;
  closed_questions: number;
  deadline: string;
  total_points: number;
};

export type HomeworkResponse = {
  message: string;
  homework: Homework;
  question_ids: number[];
};

export interface HomeworkPromise extends TypePromise<Homework[]> {}
export interface HomeworkResponsePromise
  extends TypePromise<HomeworkResponse> {}
