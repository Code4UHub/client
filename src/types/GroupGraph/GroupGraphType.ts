import { TypePromise } from 'types/TypePromise/TypePromise';

export interface GroupGraphType {
  title: string;
  value: number;
}

export interface GroupGraphPromise extends TypePromise<GroupGraphType[]> {}
