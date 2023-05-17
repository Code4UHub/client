import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'components/Card/Card';

import styles from './GoToActivityCard.module.css';

type Props = {
  className?: string;
  cardTitle: string;
  moduleName: string;
  activityName: string;
  activityProgress: string;
  actionLabel: string;
  to: string;
};

export default function GoToActivityCard({
  className,
  cardTitle,
  moduleName,
  activityName,
  activityProgress,
  actionLabel,
  to,
}: Props) {
  return (
    <Card className={`${styles.container} ${className}`}>
      <span className={styles.title}>{cardTitle}</span>
      <span className={styles['module-name']}>{moduleName}</span>
      <span className={styles['activity-name']}>{activityName}</span>
      <span className={styles.progress}>{activityProgress}</span>
      <Link
        to={to}
        className={styles.button}
      >
        {actionLabel} &gt;
      </Link>
    </Card>
  );
}

GoToActivityCard.defaultProps = {
  className: '',
};
