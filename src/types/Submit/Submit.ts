import { CompiledCodeResultsPromise } from 'types/CompiledCodeResults/CompiledCodeResults';
import { TypePromise } from 'types/TypePromise/TypePromise';

export type SubmitQuestion = {
  max_score: number;
  score: number;
};

export interface SubmitOpenQuestion extends SubmitQuestion {
  type: 'open';
  solution: {
    solution: string;
    tests: CompiledCodeResultsPromise;
  };
}

export interface SubmitClosedQuestion extends SubmitQuestion {
  type: 'closed';
  select_choice: number;
  isCorrect: true;
  explanation: string;
  solution: {
    solution: number;
    isCorrect: boolean;
    explanation: string;
  };
}

export interface HomeworkSubmitOpenQuestion extends SubmitOpenQuestion {
  question_h_id: number;
}

export interface HomeworkSubmitClosedQuestion extends SubmitClosedQuestion {
  question_h_id: number;
}

export interface ChallengeSubmitOpenQuestion extends SubmitOpenQuestion {
  question_id: number;
}

export interface ChallengeSubmitClosedQuestion extends SubmitClosedQuestion {
  question_id: number;
}

export type Submit = {
  max_score: 140;
  score: number;
};

export interface HomeworkSubmit extends Submit {
  questions: (HomeworkSubmitClosedQuestion | HomeworkSubmitOpenQuestion)[];
}

export interface ChallengeSubmit extends Submit {
  questions: (ChallengeSubmitClosedQuestion | ChallengeSubmitOpenQuestion)[];
}

export interface HomeworkSubmitPromise extends TypePromise<HomeworkSubmit> {}
export interface ChallengeSubmitPromise extends TypePromise<ChallengeSubmit> {}
