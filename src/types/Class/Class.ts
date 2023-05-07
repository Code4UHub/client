import { TypePromise } from 'types/TypePromise/TypePromise';

export type ClassRequest = {
  subject: { id: string; name: string };
  class_id: string;
  start_time: string;
  end_time: string;
  finished_date: string;
  days: { dayName: string; dayVal: string }[];
};

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
