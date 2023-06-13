import React from 'react';

import { Leaderboard } from 'types/GroupGraph/GroupGraphType';

import LeaderboardCard from 'components/LeaderboardCard/LeaderboardCard';
import NoResultsMessage from 'components/NoResultsMessage/NoResultsMessage';

import style from './LeaderboardTeacher.module.css';

type Props = {
  data: Leaderboard[];
};

export default function LeaderboardTeacher({ data }: Props) {
  if (data.length === 0)
    return <NoResultsMessage message="No hay estudiantes en la clase 🙁" />;

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
