import { TypePromise } from 'types/TypePromise/TypePromise';

export interface HomeworkResult {
  student_name: string;
  student_id: string;
  score: number;
  out_of_focus_time: number;
}

export interface HomeworkResultPromise extends TypePromise<HomeworkResult[]> {}
