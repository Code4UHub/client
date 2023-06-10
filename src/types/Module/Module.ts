import { TypePromise } from 'types/TypePromise/TypePromise';

// To solve backend problem of sending over the score inside an array of objects
type Score = {
  score: number;
};

export type Challenge = {
  total_points: number;
  challenge_id: number;
  difficulty: {
    difficulty: 'Fácil' | 'Medio' | 'Difícil';
    difficulty_id: number;
  };
  title: string;
  student_challenge: Score[];
};

export type ModuleProgress = {
  id: number;
  title: string;
  percentage: number;
  number_of_students: number;
  number_approved_students: number;
};

export type ModuleProgressList = ModuleProgress[];

export interface ModuleProgressListPromise
  extends TypePromise<ModuleProgressList> {}

// To update availability, db requires only id and is_active
export interface UpdateModule {
  is_active: boolean;
  module_id: number;
}

export interface Module extends UpdateModule {
  title: string;
}

export interface StudentModule extends Module {
  score: number;
  challenge: Challenge[];
}

export interface ModulePromise
  extends TypePromise<(Module | StudentModule)[]> {}

export type SubjectModule = {
  module_id: number;
  subject_id: string;
  title: string;
};

export interface SubjectModuleListPromise
  extends TypePromise<SubjectModule[]> {}
