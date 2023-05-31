import { TypePromise } from 'types/TypePromise/TypePromise';
import { Question } from 'routes/homework/dummyData';

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
  questions_ids: Question[];
};

export interface HomeworkPromise extends TypePromise<Homework[][]> {}
