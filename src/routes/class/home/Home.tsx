import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import ClassProgress from 'components/ClassProgress/ClassProgress';
import ContinueActivityCard from 'components/ContinueActivityCard/ContinueActivityCard';
import UpcomingHomeworkCard from 'components/UpcomingHomeworkCard/UpcomingHomeworkCard';
import HomeLeaderboardPositionCard from 'components/HomeLeaderboardPositionCard/HomeLeaderboardPositionCard';

import styles from './Home.module.css';

function StudentHome() {
  return (
    <section className={styles['home-container']}>
      <ClassProgress className={styles['home-container-item']} />
      <ContinueActivityCard className={styles['home-container-item']} />
      <UpcomingHomeworkCard className={styles['home-container-item']} />
      <HomeLeaderboardPositionCard className={styles['home-container-item']} />
    </section>
  );
}

function TeacherHome() {
  return <h1>TODO: Create Teacher dashboard</h1>;
}

export default function Home() {
  const user = useSelector((state: RootState) => state.user.currentUser);

  return user?.role === 'student' ? <StudentHome /> : <TeacherHome />;
}
