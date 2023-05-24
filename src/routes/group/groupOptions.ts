type GroupOptions = {
  title: string;
  description: string;
  information: string;
  url: string;
};

export const groupOptions: GroupOptions[] = [
  {
    title: 'Leaderboard',
    description: 'Vive el estatus de la competencia por el podium',
    information:
      'Sumatoria del puntaje, considerando los aciertos de tareas y actividades disponibles para los estudiantes, y recompensando acorde al nivel de dificultad de los ejercicios',
    url: '../group-leaderboard',
  },
  {
    title: 'Promedio por módulo',
    description: 'Observa cuánto dominan los módulos',
    information:
      'Promedio de las calificaciones de todos los estudiantes, dividido en módulos.',
    url: '../score/module',
  },
  {
    title: 'Promedio por tema',
    description: 'Supervisa los temas más fuertes o menos comprendidos',
    information:
      'Promedio de las calificaciones de todos los estudiantes, dividido en temas.',
    url: '../score/topic',
  },
  {
    title: 'Progreso por módulo',
    description: 'Mira cuántos estudiantes han aprobado cada módulo',
    information:
      'Porcentaje de estudiantes que han obtenido una calificación global de 70 o superior, por cada módulo.',
    url: '../progress/module',
  },
  {
    title: 'Progreso por tema',
    description: 'Entérate qué temas han aprobado en tu grupo',
    information:
      'Porcentaje de estudiantes que han obtenido una calificación de 70 o superior, por cada tema.',
    url: '../progress/topic',
  },
];
