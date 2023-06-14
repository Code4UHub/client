import { TypePromise } from 'types/TypePromise/TypePromise';
import { CompiledCodeResultsPromise } from 'types/CompiledCodeResults/CompiledCodeResults';

export type QuestionDifficulty = 1 | 2 | 3;

export type Question = {
  id: string;
  title: string;
  topic: string;
  author: string;
  difficulty: string;
  description: string;
};

export type QuestionOption = {
  text: string;
  explanation: string;
};

export interface ClosedQuestion extends Question {
  hints: boolean;
  answer: number;
  options: QuestionOption[];
}

export type QuestionTest = {
  input: any[];
  output: any;
};
export interface OpenQuestion extends Question {
  tests: QuestionTest[];
  driver: string;
}

export type OpenQuestionSolution = {
  isCorrect: boolean;
  code: string;
};

export type HomeworkQuestion = {
  question_h_id: number;
  passed: boolean;
  difficulty_id: QuestionDifficulty;
  module_id: number;
  title: string;
};

export type OpenSolution = {
  solution: string;
  tests: CompiledCodeResultsPromise;
};

export interface OpenHomeworkQuestion extends HomeworkQuestion {
  type: 'open';
  solution: {} | { user_input: OpenQuestionSolution } | OpenSolution;
  question: OpenQuestion;
  source_code?: string;
}

export type ClosedSolution = {
  solution: number;
  explanation: string;
  isCorrect: boolean;
};
export interface ClosedHomeworkQuestion extends HomeworkQuestion {
  type: 'closed';
  solution: {} | { user_input: number } | ClosedSolution;
  question: ClosedQuestion;
  selected_choice: number;
}

export type Questions = {
  start_date: string;
  title: string;
  endDate?: string;
};

export type HomeworkQuestionList = (
  | OpenHomeworkQuestion
  | ClosedHomeworkQuestion
)[];

export interface HomeworkQuestions extends Questions {
  homeworks: HomeworkQuestionList;
}

export interface HomeworkQuestionsPromise
  extends TypePromise<HomeworkQuestions> {}

export type ChallengeQuestion = {
  question_id: number;
  score: number;
  difficulty_id: QuestionDifficulty;
  module_id: number;
  title: string;
};

export interface OpenChallengeQuestion extends ChallengeQuestion {
  type: 'open';
  solution: {} | { user_input: OpenQuestionSolution } | OpenSolution;
  question: OpenQuestion;
  source_code?: string;
}

export interface ClosedChallengeQuestion extends ChallengeQuestion {
  type: 'closed';
  solution: {} | { user_input: number } | ClosedSolution;
  question: ClosedQuestion;
  selected_choice: number;
}

export type ChallengeQuestionList = (
  | OpenChallengeQuestion
  | ClosedChallengeQuestion
)[];

export interface ChallengeQuestions extends Questions {
  challenges: ChallengeQuestionList;
}

export interface ChallengeQuestionsPromise
  extends TypePromise<ChallengeQuestions> {}

export type HomeworkQuestionPool = {
  question_h_id: number;
  difficulty_id: QuestionDifficulty;
  module_id: number;
  title: string;
};

export interface OpenHomeworkQuestionPool extends HomeworkQuestionPool {
  type: 'closed';
  question: OpenQuestion;
}

export interface CloseHomeworkQuestionPool extends HomeworkQuestionPool {
  type: 'open';
  question: ClosedQuestion;
}

export type HomeworkQuestionPoolList = (
  | OpenHomeworkQuestionPool
  | CloseHomeworkQuestionPool
)[];

export interface HomeworkQuestionPoolPromise
  extends TypePromise<HomeworkQuestionPoolList> {}

export function isChallenge(
  assignment: ChallengeQuestions | HomeworkQuestions
): assignment is ChallengeQuestions {
  return 'challenges' in assignment;
}

export function isClosedHomeworkQuestion(
  question: ClosedHomeworkQuestion | ClosedChallengeQuestion
): question is ClosedHomeworkQuestion {
  return 'question_h_id' in question;
}

export function isChallengeQuestion(
  question:
    | ClosedHomeworkQuestion
    | ClosedChallengeQuestion
    | OpenHomeworkQuestion
    | OpenChallengeQuestion
): question is ClosedChallengeQuestion | OpenChallengeQuestion {
  return 'question_id' in question;
}
