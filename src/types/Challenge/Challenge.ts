import { TypePromise } from 'types/TypePromise/TypePromise';

export type Challenge = {
  challenge_id: number;
  module_title: string;
  challenge_title: string;
  student_id: string;
  status: 'start' | 'continue';
  difficulty: string;
};

export interface ChallengePromise extends TypePromise<Challenge> {}
