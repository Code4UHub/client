import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import ClassProgressCard from 'components/ClassProgressCard/ClassProgressCard';
import ContinueActivityCard from 'components/ContinueActivityCard/ContinueActivityCard';
import UpcomingHomeworkCard from 'components/UpcomingHomeworkCard/UpcomingHomeworkCard';
import HomeLeaderboardPositionCard from 'components/HomeLeaderboardPositionCard/HomeLeaderboardPositionCard';

import ClassModulesProgressCard from 'components/ClassModulesProgressCard/ClassModulesProgressCard';

import styles from './Home.module.css';

function StudentHome() {
  return (
    <section className={styles['home-container']}>
      <ClassProgressCard className={styles['home-container-item']} />
      <ContinueActivityCard className={styles['home-container-item']} />
      <UpcomingHomeworkCard className={styles['home-container-item']} />
      <HomeLeaderboardPositionCard className={styles['home-container-item']} />
    </section>
  );
}

function TeacherHome() {
  return (
    <section className={styles['home-container']}>
      <ClassProgressCard className={styles['home-container-item']} />
      <ClassModulesProgressCard className={styles['home-container-item']} />
      <UpcomingHomeworkCard className={styles['home-container-item']} />
    </section>
  );
}

export default function Home() {
  const user = useSelector((state: RootState) => state.user.currentUser);

  return user?.role === 'student' ? <StudentHome /> : <TeacherHome />;
}
