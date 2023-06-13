import { TypePromise } from 'types/TypePromise/TypePromise';

export type StudentLeaderboardPosition = {
  student: string;
  score: number;
  name: string;
  position: number;
};

export type LeaderboardList = StudentLeaderboardPosition[];

export interface LeaderboardPromise extends TypePromise<LeaderboardList> {}
