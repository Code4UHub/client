import { TypePromise } from 'types/TypePromise/TypePromise';

export interface GroupGraphType {
  title: string;
  percentage: number;
  id: number;
}

export interface Leaderboard {
  position: number;
  name: string;
  score: number;
  student: string;
}

export interface GroupGraphPromise
  extends TypePromise<(GroupGraphType | Leaderboard)[]> {}
