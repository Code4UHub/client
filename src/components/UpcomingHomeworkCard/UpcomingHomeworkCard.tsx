import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Card from 'components/Card/Card';
import HomeworkList from 'components/HomeworkList/HomeworkList';

import { getHomework, dummyList } from './dummyData';
import styles from './UpcomingHomeworkCard.module.css';

type Props = {
  className?: string;
};

export default function UpcomingHomeworkCard({ className }: Props) {
  const [homeworkList, setHomeworkList] = useState<typeof dummyList>([]);

  useEffect(() => {
    const loadHomework = async () => {
      const data = await getHomework();

      setHomeworkList(data);
    };

    loadHomework();
  }, []);

  return (
    <Card className={`${styles.container} ${className}`}>
      <div className={styles['section-header']}>
        <h2>Tareas próximas</h2>
        <Link to="homework">Ver tareas</Link>
      </div>
      <HomeworkList homeworkList={homeworkList} />
    </Card>
  );
}
UpcomingHomeworkCard.defaultProps = {
  className: '',
};
