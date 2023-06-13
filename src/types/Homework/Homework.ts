import {
  ClosedHomeworkQuestion,
  OpenHomeworkQuestion,
  QuestionDifficulty,
} from 'types/Questions/Question';
import { TypePromise } from 'types/TypePromise/TypePromise';

export type HomeworkRequest = {
  class_id: string | { id: string; value: string };
  difficulty_id: 1 | 2 | 3;
  title: string;
  open_questions: number | undefined;
  closed_questions: number | undefined;
  deadline: string;
  questions: (OpenHomeworkQuestion | ClosedHomeworkQuestion)[];
};

export type Homework = {
  homework_id: number;
  class_id: string;
  difficulty_id: number;
  title: string;
  open_questions: number;
  closed_questions: number;
  deadline: string;
  total_points: number;
};

export type HomeworkResponse = {
  message: string;
  homework: Homework;
  question_ids: number[];
};

export interface HomeworkPromise extends TypePromise<Homework[]> {}
export interface HomeworkResponsePromise
  extends TypePromise<HomeworkResponse> {}

export type AllHomeworks = {
  homework_id: number;
  title: string;
  deadline: string;
  total_points: number;
  is_active: boolean;
};

export interface StudentAllHomeworks extends AllHomeworks {
  score: number;
  'class.class_id': string;
  'class.subject.subject_id': string;
  'class.subject.subject_name': string;
}
export interface TeacherAllHomeworks extends AllHomeworks {
  difficulty_id: QuestionDifficulty;
  class_id: string;
  open_questions: number;
  closed_questions: number;
}

export interface StudentAllHomeworksPromise
  extends TypePromise<StudentAllHomeworks[]> {}
export interface TeacherAllHomeworksPromise
  extends TypePromise<TeacherAllHomeworks[]> {}

export interface StudentClassHomework extends AllHomeworks {
  score: number;
  difficulty_id: number;
}

export type StudentClassHomeworks = StudentClassHomework[];

export interface StudentClassHomeworksPromise
  extends TypePromise<StudentClassHomeworks> {}
