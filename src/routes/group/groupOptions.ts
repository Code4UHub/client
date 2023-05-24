type GroupOptions = {
  title: string;
  description: string;
  url: string;
};

export const groupOptions: GroupOptions[] = [
  {
    title: 'Leaderboard',
    description: 'Vive el estatus de la competencia por el podium',
    url: '../group-leaderboard',
  },
  {
    title: 'Promedio por módulo',
    description: 'Observa cuánto dominan los módulos',
    url: '../score/module',
  },
  {
    title: 'Promedio por tema',
    description: 'Supervisa los temas más fuertes o menos comprendidos',
    url: '../score/topic',
  },
  {
    title: 'Progreso por módulo',
    description: 'Mira cuántos estudiantes han aprobado cada módulo',
    url: '../progress/module',
  },
  {
    title: 'Progreso por tema',
    description: 'Entérate qué temas han aprobado en tu grupo',
    url: '../progress/topic',
  },
];
