import { TypePromise } from 'types/TypePromise/TypePromise';

export interface SubjectModule {
  module_id: number;
  title: string;
  subject_id: string;
}

export interface SubjectModulePromise extends TypePromise<SubjectModule[]> {}
