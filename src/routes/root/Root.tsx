import React from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { Navigate, useOutlet } from 'react-router-dom';
import NavBar from 'components/NavBar/NavBar';
import TeacherNavBar from 'components/TeacherNavBar/TeacherNavBar';
import styles from './Root.module.css';

export function Root() {
  const outlet = useOutlet();
  const user = useSelector((state: RootState) => state.user.currentUser);

  if (!user) return <Navigate to="/auth" />;

  return (
    <>
      {user.role === 'student' ? <NavBar /> : <TeacherNavBar />}
      <main className={styles['main-content']}>{outlet}</main>
    </>
  );
}
