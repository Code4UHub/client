export type GraphCategory = 'Leaderboard' | 'Módulo' | 'Tema';

export type GraphEvaluate = 'Puntaje' | 'Promedio' | 'Progreso';

export type GroupOptions = {
  title: string;
  description: string;
  information: string;
  category: GraphCategory;
  evaluate: GraphEvaluate;
  url: string;
};
