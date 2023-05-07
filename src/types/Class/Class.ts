import { TypePromise } from 'types/TypePromise/TypePromise';

export type Class = {
  class_id: string;
  finished_date: string;
  days: string[];
  start_time: string;
  end_time: string;
  teacher_name: string;
  subject_id: string;
  subject_name: string;
};

export interface ClassPromise extends TypePromise<Class> {}
