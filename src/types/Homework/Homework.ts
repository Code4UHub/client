import { TypePromise } from 'types/TypePromise/TypePromise';

export type Homework = {
  homework_id: string;
  homework_name: string;
  is_finished: boolean;
  date: Date;
};

export interface HomeworkPromise extends TypePromise<Homework[][]> {}
