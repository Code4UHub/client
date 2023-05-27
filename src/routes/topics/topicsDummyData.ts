import { Topic } from 'types/Topic/Topic';

export const data: Topic[] = [
  {
    topic_id: 1,
    title: 'Using for loop',
    percentage: 75,
    challenges: [
      {
        challenge_id: 1,
        level: 'fácil',
        student_points: 60,
        total_points: 100,
      },
      {
        challenge_id: 2,
        level: 'medio',
        student_points: 60,
        total_points: 200,
      },
      {
        challenge_id: 3,
        level: 'difícil',
        student_points: 60,
        total_points: 300,
      },
    ],
  },
  {
    topic_id: 2,
    title: 'Using while loop',
    percentage: 66,
    challenges: [
      {
        challenge_id: 4,
        level: 'fácil',
        student_points: 10,
        total_points: 100,
      },
      {
        challenge_id: 5,
        level: 'medio',
        student_points: 160,
        total_points: 200,
      },
      {
        challenge_id: 6,
        level: 'difícil',
        student_points: 0,
        total_points: 300,
      },
    ],
  },
  {
    topic_id: 3,
    title: 'Nested loops',
    percentage: 15,
    challenges: [
      {
        challenge_id: 7,
        level: 'fácil',
        student_points: 10,
        total_points: 100,
      },
      {
        challenge_id: 8,
        level: 'medio',
        student_points: 30,
        total_points: 200,
      },
      {
        challenge_id: 9,
        level: 'difícil',
        student_points: 20,
        total_points: 300,
      },
    ],
  },
  {
    topic_id: 4,
    title: 'Optimizing loops',
    percentage: 40,
    challenges: [
      {
        challenge_id: 10,
        level: 'fácil',
        student_points: 90,
        total_points: 100,
      },
      {
        challenge_id: 11,
        level: 'medio',
        student_points: 150,
        total_points: 200,
      },
      {
        challenge_id: 12,
        level: 'difícil',
        student_points: 200,
        total_points: 300,
      },
    ],
  },
];
