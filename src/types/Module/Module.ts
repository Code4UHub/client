import { TypePromise } from 'types/TypePromise/TypePromise';

// To update availability, db requires only id and is_active
export interface UpdateModule {
  is_active: boolean;
  module_id: number;
}

export interface Module extends UpdateModule {
  title: string;
}

export interface StudentModule extends Module {
  percentage?: number;
}

export interface ModulePromise
  extends TypePromise<(Module | StudentModule)[]> {}
