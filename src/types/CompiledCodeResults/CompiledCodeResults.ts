import { TypePromise } from 'types/TypePromise/TypePromise';

export type Test = {
  status: 'succes' | 'failed' | 'error';
  input: any;
  output: any;
  expected: any;
};

export type CompiledCodeResults = {
  status: string;
  total: number;
  passed: number;
  grade: 0;
  tests: Test[];
};

export interface CompiledCodeResultsPromise
  extends TypePromise<CompiledCodeResults> {}
