import { TypePromise } from 'types/TypePromise/TypePromise';

export type StudentRequest = {
  class_id: string;
  subject_id: string;
  subject_name: string;
  student_id: string;
  first_name: string;
  last_name: string;
  request_date: string;
};

export type RequestAnswer = {
  class_id: string;
  student_id: string;
};

export interface StudentRequestPromise extends TypePromise<StudentRequest[]> {}
