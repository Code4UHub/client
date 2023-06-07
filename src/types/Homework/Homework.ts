import { TypePromise } from 'types/TypePromise/TypePromise';
import { HomeworkQuestionList } from 'types/Questions/Question';

export type Homework = {
  homework_id: string;
  homework_name: string;
  is_finished: boolean;
  date: Date;
};

export type HomeworkRequest = {
  class_id: string | { id: string; value: string };
  difficulty_id: 1 | 2 | 3;
  title: string;
  open_questions: number | undefined;
  closed_questions: number | undefined;
  deadline: string;
  questions: HomeworkQuestionList;
};

type HomeworkObj = {
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
  homework: HomeworkObj;
  question_ids: number[];
};

export interface HomeworkPromise extends TypePromise<Homework[][]> {}
export interface HomeworkResponsePromise
  extends TypePromise<HomeworkResponse> {}
