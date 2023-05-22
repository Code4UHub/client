import { Question } from './Question';

export interface OpenQuestion extends Question {
  type: 'open';
  driver: string;
}
