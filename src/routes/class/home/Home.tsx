import React from 'react';

import ClassProgress from 'components/ClassProgress/ClassProgress';
import ContinueActivityCard from 'components/ContinueActivityCard/ContinueActivityCard';
import UpcomingHomeworkCard from 'components/UpcomingHomeworkCard/UpcomingHomeworkCard';

import styles from './Home.module.css';

export default function Home() {
  return (
    <section className={styles['home-container']}>
      <ClassProgress className={styles['home-container-item']} />
      <ContinueActivityCard className={styles['home-container-item']} />
      <UpcomingHomeworkCard className={styles['home-container-item']} />
      <div className={styles['home-container-item']}>Hola</div>
    </section>
  );
}
