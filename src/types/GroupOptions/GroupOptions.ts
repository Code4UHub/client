export type GraphCategory = 'Leaderboard' | 'Módulo' | 'Actividad';

export type GraphEvaluate = 'Puntaje' | 'Promedio' | 'Progreso';

export type GroupOptions = {
  title: string;
  description: string;
  information: string;
  category: GraphCategory;
  evaluate: GraphEvaluate;
};
