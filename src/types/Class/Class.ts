import { TypePromise } from 'types/TypePromise/TypePromise';

export type ClassRequest = {
  subject: { id: string; name: string };
  class_id: string;
  start_time: string;
  end_time: string;
  finished_date: string;
  days: { dayName: string; dayVal: string }[];
};

type BaseClass = {
  class_id: string;
  days: string[];
  start_time: string;
  end_time: string;
  subject_name: string;
};

export interface Class extends BaseClass {
  finished_date: string;
  subject_id: string;
  teacher_name: string;
  teacher_id: string;
}

export interface StudentClass extends BaseClass {
  pending: boolean;
  is_finished: boolean;
  teacher_name: string;
}

export interface TeacherClass extends BaseClass {
  subject_id: string;
}

export interface ClassPromise extends TypePromise<Class> {}
export interface StudentClassListPromise extends TypePromise<StudentClass[]> {}
export interface TeacherClassListPromise extends TypePromise<TeacherClass[]> {}
