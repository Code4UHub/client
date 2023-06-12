import React from 'react';
import { Link } from 'react-router-dom';
import { Challenge } from 'types/Challenge/Challenge';

import Card from 'components/Card/Card';
import NoResultsMessage from 'components/NoResultsMessage/NoResultsMessage';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

import styles from './GoToActivityCard.module.css';

type Props = {
  activity: Challenge | {};
  className?: string;
  isLoading: boolean;
};

function isChallenge(
  challenge: Challenge | {} | string
): challenge is Challenge {
  if (typeof challenge === 'string') return false;
  return 'challenge_id' in challenge;
}

function getNode(isLoading: boolean) {
  return isLoading ? (
    <div className={styles['loading-container']}>
      <LoadingSpinner />
    </div>
  ) : (
    <NoResultsMessage
      className={styles['no-results-message']}
      message="Sin desafíos pendientes 😃"
    />
  );
}

export default function GoToActivityCard({
  activity,
  className,
  isLoading,
}: Props) {
  return (
    <Card className={`${styles.container} ${className}`}>
      <span className={styles.title}>Continúa donde te quedaste...</span>

      {!isLoading && isChallenge(activity) ? (
        <>
          <span className={styles['module-name']}>{activity.module_title}</span>
          <span className={styles['activity-name']}>
            {activity.challenge_title}
          </span>
          <Link
            to={`challenge/${activity.challenge_id}`}
            className={styles.button}
          >
            {activity.status === 'continue' ? 'Continuar' : 'Empezar'} &gt;
          </Link>
        </>
      ) : (
        getNode(isLoading)
      )}
    </Card>
  );
}

GoToActivityCard.defaultProps = {
  className: '',
};
