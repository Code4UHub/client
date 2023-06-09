import React from 'react';
import { Link } from 'react-router-dom';
import { Challenge } from 'types/Challenge/Challenge';

import Card from 'components/Card/Card';
import NoResultsMessage from 'components/NoResultsMessage/NoResultsMessage';

import styles from './GoToActivityCard.module.css';

type Props = {
  activity: Challenge | {};
  className?: string;
};

function isChallenge(challenge: Challenge | {}): challenge is Challenge {
  return 'title' in challenge;
}
export default function GoToActivityCard({ activity, className }: Props) {
  return (
    <Card className={`${styles.container} ${className}`}>
      <span className={styles.title}>Continúa donde te quedaste...</span>
      {isChallenge(activity) ? (
        <>
          <span className={styles['module-name']}>{activity.title}</span>
          <span className={styles['activity-name']}>
            {activity.challenge_title}
          </span>
          <Link
            to={`challenge/${activity.challenge_id}`}
            className={styles.button}
          >
            Continuar &gt;
          </Link>
        </>
      ) : (
        <NoResultsMessage
          className={styles['no-results-message']}
          message="Sin desafíos pendientes"
        />
      )}
    </Card>
  );
}

GoToActivityCard.defaultProps = {
  className: '',
};
