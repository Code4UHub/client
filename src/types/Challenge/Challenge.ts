import { TypePromise } from 'types/TypePromise/TypePromise';

export type Challenge = {
  module_id: number;
  title: string;
  is_active: true;
  score: number;
  challenge_id: number;
  challenge_title: string;
};

export interface ChallengePromise extends TypePromise<Challenge> {}
