export type Difficulty = 'Fácil' | 'Medio' | 'Difícil';

export interface Question {
  id: string;
  author: string;
  title: string;
  description: string;
  topic: string;
  difficulty: Difficulty;
}
