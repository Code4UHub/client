import React from 'react';
import { Link } from 'react-router-dom';

import { Homework } from 'types/Homework/Homework';

import Card from 'components/Card/Card';
import HomeworkList from 'components/HomeworkList/HomeworkList';
import CardSkeleton from 'components/CardSkeleton/CardSkeleton';

import { useHomeworkList } from 'hooks/useHomeworkList';

import styles from './UpcomingHomeworkCard.module.css';

type Props = {
  className?: string;
};

export default function UpcomingHomeworkCard({ className }: Props) {
  const { homeworkList, isLoading } = useHomeworkList(true);

  return (
    <Card className={`${styles.container} ${className}`}>
      <div className={styles['section-header']}>
        <h2>Tareas próximas</h2>
        <Link to="homework">Ver tareas</Link>
      </div>
      {isLoading ? (
        <div className={styles['card-skeleton']}>
          <CardSkeleton items={10} />
        </div>
      ) : (
        <HomeworkList homeworkList={homeworkList as Homework[][]} />
      )}
    </Card>
  );
}
UpcomingHomeworkCard.defaultProps = {
  className: '',
};
