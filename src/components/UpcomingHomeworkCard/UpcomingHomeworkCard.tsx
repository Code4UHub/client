import React from 'react';
import { Link } from 'react-router-dom';

import { Homework, StudentClassHomework } from 'types/Homework/Homework';

import Card from 'components/Card/Card';
import HomeworkList from 'components/HomeworkList/HomeworkList';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

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
        <LoadingSpinner />
      ) : (
        <HomeworkList
          homeworkList={homeworkList as (Homework | StudentClassHomework)[][]}
        />
      )}
    </Card>
  );
}
UpcomingHomeworkCard.defaultProps = {
  className: '',
};
