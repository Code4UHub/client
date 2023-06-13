import { TypePromise } from 'types/TypePromise/TypePromise';

export type Subject = {
  subject_id: string;
  subject_name: string;
};

export interface SubjectPromise extends TypePromise<Subject[]> {}
