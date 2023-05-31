import { TypePromise } from 'types/TypePromise/TypePromise';

export interface GroupGraphType {
  title: string;
  value: number;
  id: number;
}

export interface Leaderboard {
  position: number;
  name: string;
  points: number;
  student_id: string;
}

export interface GroupGraphPromise
  extends TypePromise<(GroupGraphType | Leaderboard)[]> {}
