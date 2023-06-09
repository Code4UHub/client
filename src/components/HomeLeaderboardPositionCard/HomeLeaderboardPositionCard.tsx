import React from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { LeaderboardList } from 'types/Leaderboard/Leaderboard';

import Card from 'components/Card/Card';
import Carousel from 'components/Carousel/Carousel';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import NoResultsMessage from 'components/NoResultsMessage/NoResultsMessage';

import {
  StudentPositionLeaderboard,
  useLeaderboardList,
} from 'hooks/useLeaderboardList';

import { ReactComponent as UpArrowIcon } from './ArrowUp.svg';
import { ReactComponent as DownArrowIcon } from './ArrowDown.svg';
import { ReactComponent as FirstPlaceIcon } from './FirstPlace.svg';
import { ReactComponent as SecondPlaceIcon } from './SecondPlace.svg';
import { ReactComponent as ThirdPlaceIcon } from './ThirdPlace.svg';

import styles from './HomeLeaderboardPositionCard.module.css';

type LeaderboardUpDownProps = {
  direction: 'up' | 'down';
  points?: number | undefined;
};

function LeaderboardUpDown({ direction, points }: LeaderboardUpDownProps) {
  return (
    <div className={`${styles['up-down']} ${styles[direction]}`}>
      {direction === 'up' ? <UpArrowIcon /> : <DownArrowIcon />}
      {typeof points === 'number' && <span>{`${points}pts`}</span>}
    </div>
  );
}
LeaderboardUpDown.defaultProps = {
  points: undefined,
};

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

function getTeacherLeaderbordContent(leaderboard: LeaderboardList) {
  if (leaderboard.length === 0) {
    return (
      <NoResultsMessage
        message="No hay estudiantes en la clase 🙁"
        className={styles['no-results']}
      />
    );
  }

  const leaderboardNodes = leaderboard.slice(0, 3).map((student) => (
    <div
      key={student.student}
      className={styles['top-position-container']}
    >
      {getPositionElement(student.position, student.name)}
      <span className={styles['position-points']}>{student.score}pts</span>
    </div>
  ));

  return <Carousel items={leaderboardNodes} />;
}

function TeacherCard() {
  const { leaderboardList, isLoading } = useLeaderboardList();

  return isLoading ? (
    <LoadingSpinner className={styles['loading-spinner']} />
  ) : (
    getTeacherLeaderbordContent(leaderboardList as LeaderboardList)
  );
}

function getStudentPosition(position: number) {
  switch (position) {
    case 1:
      return <FirstPlaceIcon className={styles.position} />;
    case 2:
      return <SecondPlaceIcon className={styles.position} />;
    case 3:
      return <ThirdPlaceIcon className={styles.position} />;
    default:
      return <span>{position}</span>;
  }
}

function StudentCard() {
  const { leaderboardList, isLoading } = useLeaderboardList();

  return (
    <div className={styles['student-container']}>
      <LeaderboardUpDown
        points={
          !isLoading && leaderboardList
            ? (leaderboardList as StudentPositionLeaderboard).up
            : undefined
        }
        direction="up"
      />
      <div className={styles['position-container']}>
        {isLoading ? (
          <LoadingSpinner className={styles['loading-spinner']} />
        ) : (
          leaderboardList && (
            <>
              <span>
                {getStudentPosition(
                  (leaderboardList as StudentPositionLeaderboard).position
                )}
              </span>
              <span>
                {(leaderboardList as StudentPositionLeaderboard).score}pts
              </span>
            </>
          )
        )}
      </div>
      <LeaderboardUpDown
        points={
          !isLoading && leaderboardList
            ? (leaderboardList as StudentPositionLeaderboard).down
            : undefined
        }
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
        to={user?.role === 'teacher' ? 'graphs/0' : 'leaderboard'}
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
