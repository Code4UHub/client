import React, { useState, useEffect } from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from 'components/Card/Card';
import Carousel from 'components/Carousel/Carousel';

import {
  Position,
  TopLeaderboardList,
  getTopLeaderboardListData,
  getYourPositionData,
} from './dummyData';

import { ReactComponent as UpArrowIcon } from './ArrowUp.svg';
import { ReactComponent as DownArrowIcon } from './ArrowDown.svg';
import { ReactComponent as FirstPlaceIcon } from './FirstPlace.svg';
import { ReactComponent as SecondPlaceIcon } from './SecondPlace.svg';
import { ReactComponent as ThirdPlaceIcon } from './ThirdPlace.svg';

import styles from './HomeLeaderboardPositionCard.module.css';

type LeaderboardUpDownProps = {
  direction: 'up' | 'down';
  points: number;
};

function LeaderboardUpDown({ direction, points }: LeaderboardUpDownProps) {
  return (
    <div className={`${styles['up-down']} ${styles[direction]}`}>
      {direction === 'up' ? <UpArrowIcon /> : <DownArrowIcon />}
      <span>{`${points}pts`}</span>
    </div>
  );
}

function getPositionElement(position: number, name: string) {
  switch (position) {
    case 1:
      return (
        <>
          <FirstPlaceIcon className={styles.position} />
          <span className={`${styles['position-name']} ${styles.first}`}>
            {name}
          </span>
        </>
      );

    case 2:
      return (
        <>
          <SecondPlaceIcon className={styles.position} />
          <span className={`${styles['position-name']} ${styles.second}`}>
            {name}
          </span>
        </>
      );
    case 3:
      return (
        <>
          <ThirdPlaceIcon className={styles.position} />;
          <span className={`${styles['position-name']} ${styles.third}`}>
            {name}
          </span>
        </>
      );
    default:
      return (
        <>
          <span>{`${position}`}</span>
          <span className={styles['position-name']}>{name}</span>
        </>
      );
  }
}

function TeacherCard() {
  const [leaderboardList, setLeaderboardList] = useState<TopLeaderboardList>(
    []
  );

  const leaderboardNodes = leaderboardList.map((position, index) => (
    <div
      key={position.id}
      className={styles['top-position-container']}
    >
      {getPositionElement(index + 1, position.name)}
      <span className={styles['position-points']}>{position.points}pts</span>
    </div>
  ));

  useEffect(() => {
    const getTopLeadeboard = async () => {
      const topLeadeboard = await getTopLeaderboardListData();

      setLeaderboardList(topLeadeboard);
    };

    getTopLeadeboard();
  }, []);

  return <Carousel items={leaderboardNodes} />;
}

function StudentCard() {
  const [positionInfo, setPositionInfo] = useState<Position>();

  useEffect(() => {
    const getPositionInfo = async () => {
      const position = await getYourPositionData();
      setPositionInfo(position);
    };

    getPositionInfo();
  }, []);

  if (!positionInfo) return null;

  return (
    <div>
      <LeaderboardUpDown
        points={positionInfo.up}
        direction="up"
      />
      <div className={styles['position-container']}>
        <span>{positionInfo.position}</span>
        <span>{positionInfo.points}pts</span>
      </div>
      <LeaderboardUpDown
        points={positionInfo.down}
        direction="down"
      />
    </div>
  );
}

type Props = {
  className?: string;
};

export default function HomeLeaderboardPositionCard({ className }: Props) {
  const user = useSelector((state: RootState) => state.user.currentUser);

  return (
    <Card className={`${className} ${styles.container}`}>
      <div className={`${styles['section-header']}`}>
        <h2>
          {user?.role === 'student' ? 'Posición actual' : 'Top posiciones'}
        </h2>
      </div>
      {user?.role === 'student' ? <StudentCard /> : <TeacherCard />}
      <Link
        to="leaderboard"
        className={styles.button}
      >
        Ver Leaderboard
      </Link>
    </Card>
  );
}
HomeLeaderboardPositionCard.defaultProps = {
  className: '',
};
