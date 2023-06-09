import React from 'react';

import { Leaderboard } from 'types/GroupGraph/GroupGraphType';

import LeaderboardCard from 'components/LeaderboardCard/LeaderboardCard';

import style from './LeaderboardTeacher.module.css';

type Props = {
  data: Leaderboard[];
};

export default function LeaderboardTeacher({ data }: Props) {
  if (data.length === 0 || !(data[0] as Leaderboard)?.student)
    return <h1>Loading</h1>;

  return (
    <div className={style['leaderboard-container']}>
      {data.map(({ student, score, position, name }) => (
        <LeaderboardCard
          key={student}
          position={position}
          student_id={student}
          points={score}
          name={name}
        />
      ))}
    </div>
  );
}
