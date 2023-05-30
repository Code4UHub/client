import React from 'react';

import { Leaderboard } from 'types/GroupGraph/GroupGraphType';
import Card from 'components/Card/Card';

import style from './LeaderboardTeacher.module.css';

type Props = {
  data: Leaderboard[];
};

export default function LeaderboardTeacher({ data }: Props) {
  if (data.length === 0 || !(data[0] as Leaderboard)?.student_id)
    return <h1>Loading</h1>;
  return (
    <div className={style['leaderboard-container']}>
      {data.map((student) => (
        <Card
          key={student.student_id}
          className={style.card}
        >
          <span>{student.position}</span>
          <span>{student.name}</span>
          <span>{student.points}</span>
        </Card>
      ))}
    </div>
  );
}
