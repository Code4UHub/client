import React from 'react';

import Card from 'components/Card/Card';
import { formatPoints } from 'utils/format/formatPoints';

import { ReactComponent as FirstIcon } from './FirstPlace.svg';
import { ReactComponent as SecondIcon } from './SecondPlace.svg';
import { ReactComponent as ThirdIcon } from './ThirdPlace.svg';

import style from './LeaderboardCard.module.css';

const getPodiumIcon = (position: number) => {
  switch (position) {
    case 1:
      return <FirstIcon className={style.podium} />;
    case 2:
      return <SecondIcon className={style.podium} />;
    case 3:
      return <ThirdIcon className={style.podium} />;
    default:
      return <FirstIcon className={style.podium} />;
  }
};

const getPodiumStyle = (position: number) => {
  switch (position) {
    case 1:
      return style.first;
    case 2:
      return style.second;
    case 3:
      return style.third;
    default:
      return style.info;
  }
};

type Props = {
  position: number;
  name: string;
  points: number;
  student_id: string;
};

export default function LeaderboardCard({
  position,
  name,
  points,
  student_id,
}: Props) {
  const isInPodium = position < 4;
  const formattedPoints = formatPoints(points);
  return (
    <Card
      key={student_id}
      className={style.card}
    >
      {isInPodium ? (
        getPodiumIcon(position)
      ) : (
        <span className={style.position}>{position}</span>
      )}
      <span className={getPodiumStyle(position)}>{name}</span>
      <span className={getPodiumStyle(position)}>{formattedPoints}pts</span>
    </Card>
  );
}
