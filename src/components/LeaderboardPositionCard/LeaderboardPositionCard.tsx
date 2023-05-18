import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'components/Card/Card';

import { ReactComponent as UpArrowIcon } from './ArrowUp.svg';
import { ReactComponent as DownArrowIcon } from './ArrowDown.svg';

import styles from './LeaderboardPositionCard.module.css';

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

type Props = {
  className?: string;
};

export default function LeaderboardPositionCard({ className }: Props) {
  return (
    <Card className={`${className} ${styles.container}`}>
      <div className={`${styles['section-header']}`}>
        <h2>Posición actual</h2>
      </div>
      <div>
        <LeaderboardUpDown
          points={70}
          direction="up"
        />
        <div className={styles['position-container']}>
          <span>7</span>
          <span>800pts</span>
        </div>
        <LeaderboardUpDown
          points={280}
          direction="down"
        />
      </div>
      <Link
        to="leaderboard"
        className={styles.button}
      >
        Ver Leaderboard
      </Link>
    </Card>
  );
}
LeaderboardPositionCard.defaultProps = {
  className: '',
};
