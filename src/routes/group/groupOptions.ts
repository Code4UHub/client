import { GroupOptions } from 'types/GroupOptions/GroupOptions';

export const groupOptions: GroupOptions[] = [
  {
    title: 'Leaderboard',
    description: 'Vive el estatus de la competencia por el podium',
    information:
      'Sumatoria del puntaje, considerando los aciertos de tareas y actividades disponibles para los estudiantes, y recompensando acorde al nivel de dificultad de los ejercicios',
    category: 'Leaderboard',
    evaluate: 'Puntaje',
  },
  {
    title: 'Promedio por módulo',
    description: 'Observa cuánto dominan los módulos',
    information:
      'Promedio de las calificaciones de todos los estudiantes, dividido en módulos.',
    category: 'Módulo',
    evaluate: 'Promedio',
  },
  {
    title: 'Progreso por módulo',
    description: 'Mira cuántos estudiantes han aprobado cada módulo',
    information:
      'Porcentaje de estudiantes que han obtenido una calificación global de 70 o superior, por cada módulo.',
    category: 'Módulo',
    evaluate: 'Progreso',
  },
  {
    title: 'Promedio por actividad',
    description: 'Analiza los resultados de tus actividades creadas',
    information:
      'Promedio de las calificaciones de todos los estudiantes, dividido en actividades.',
    category: 'Actividad',
    evaluate: 'Promedio',
  },
];
