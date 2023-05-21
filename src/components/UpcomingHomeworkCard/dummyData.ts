import { Homework } from 'types/Homework/Homework';

export const dummyList: Homework[][] = [
  [
    {
      homework_id: '1',
      homework_name: 'Assignment 1',
      is_finished: true,
      date: new Date('2023-05-16'),
    },
    {
      homework_id: '2',
      homework_name: 'Assignment 2',
      is_finished: false,
      date: new Date('2023-05-16'),
    },
  ],
  [
    {
      homework_id: '3',
      homework_name: 'Assignment 3',
      is_finished: true,
      date: new Date('2023-05-17'),
    },
    {
      homework_id: '4',
      homework_name: 'Assignment 4',
      is_finished: false,
      date: new Date('2023-05-17'),
    },
  ],
  [
    {
      homework_id: '5',
      homework_name: 'Assignment 5',
      is_finished: true,
      date: new Date('2023-05-18'),
    },
    {
      homework_id: '6',
      homework_name: 'Assignment 6',
      is_finished: true,
      date: new Date('2023-05-18'),
    },
  ],
];

export const getHomework = (): Promise<Homework[][]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyList);
    }, 5000);
  });
