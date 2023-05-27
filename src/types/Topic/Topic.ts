export type Challenge = {
  level: 'fácil' | 'medio' | 'difícil';
  total_points: number;
  student_points: number;
  challenge_id: number;
};

export type Topic = {
  topic_id: number;
  percentage: number;
  title: string;
  challenges: Challenge[];
};
