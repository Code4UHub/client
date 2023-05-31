import { StudentModule } from 'types/Module/Module';

export const data: StudentModule[] = [
  {
    module_id: 1,
    title: 'Using for loop',
    score: 95,
    is_active: true,
    challenge: [
      {
        challenge_id: 1,
        level: 'fácil',
        total_points: 100,
        difficulty_id: 1,
        title: '',
        student_challenge: [
          {
            score: 10,
          },
        ],
      },
      {
        challenge_id: 2,
        level: 'medio',
        total_points: 200,
        difficulty_id: 2,
        title: '',
        student_challenge: [
          {
            score: 20,
          },
        ],
      },
      {
        challenge_id: 3,
        level: 'difícil',
        total_points: 300,
        difficulty_id: 3,
        title: '',
        student_challenge: [
          {
            score: 10,
          },
        ],
      },
    ],
  },
  {
    module_id: 2,
    title: 'Using while loop',
    score: 70,
    is_active: true,
    challenge: [
      {
        challenge_id: 4,
        level: 'fácil',
        total_points: 100,
        difficulty_id: 1,
        title: '',
        student_challenge: [
          {
            score: 20,
          },
        ],
      },
      {
        challenge_id: 5,
        level: 'medio',
        total_points: 200,
        difficulty_id: 2,
        title: '',
        student_challenge: [
          {
            score: 20,
          },
        ],
      },
      {
        challenge_id: 6,
        level: 'difícil',
        total_points: 300,
        difficulty_id: 3,
        title: '',
        student_challenge: [
          {
            score: 20,
          },
        ],
      },
    ],
  },
  {
    module_id: 3,
    title: 'Nested loops',
    score: 15,
    is_active: true,
    challenge: [
      {
        challenge_id: 7,
        level: 'fácil',
        total_points: 100,
        difficulty_id: 1,
        title: '',
        student_challenge: [
          {
            score: 50,
          },
        ],
      },
      {
        challenge_id: 8,
        level: 'medio',
        total_points: 200,
        difficulty_id: 2,
        title: '',
        student_challenge: [
          {
            score: 70,
          },
        ],
      },
      {
        challenge_id: 9,
        level: 'difícil',
        total_points: 300,
        difficulty_id: 3,
        title: '',
        student_challenge: [
          {
            score: 10,
          },
        ],
      },
    ],
  },
  {
    module_id: 4,
    title: 'Optimizing loops',
    score: 40,
    is_active: true,
    challenge: [
      {
        challenge_id: 10,
        level: 'fácil',
        total_points: 100,
        difficulty_id: 1,
        title: '',
        student_challenge: [
          {
            score: 20,
          },
        ],
      },
      {
        challenge_id: 11,
        level: 'medio',
        total_points: 200,
        difficulty_id: 2,
        title: '',
        student_challenge: [
          {
            score: 20,
          },
        ],
      },
      {
        challenge_id: 12,
        level: 'difícil',
        total_points: 300,
        difficulty_id: 3,
        title: '',
        student_challenge: [
          {
            score: 20,
          },
        ],
      },
    ],
  },
];
