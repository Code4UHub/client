const topLeaderboardList = [
  {
    id: 1,
    name: 'Carlos Díaz',
    points: 1100,
  },
  {
    id: 2,
    name: 'Jorge Delgado',
    points: 1280,
  },
  {
    id: 3,
    name: 'Karla Sánchez',
    points: 1100,
  },
];

const yourPosition = {
  id: 'testid1',
  position: 7,
  points: 800,
  up: 70,
  down: 120,
};

export type Position = typeof yourPosition;
export type TopLeaderboardList = typeof topLeaderboardList;

export const getYourPositionData = (): Promise<typeof yourPosition> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(yourPosition);
    }, 5000);
  });

export const getTopLeaderboardListData = (): Promise<
  typeof topLeaderboardList
> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(topLeaderboardList);
    }, 5000);
  });
