import { Question } from './Question';

export type Option = {
  text: string;
  explanation: string;
};

export interface ClosedQuestion extends Question {
  type: 'closed';
  answer: number;
  hints: boolean;
  options: Option[];
}
