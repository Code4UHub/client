import React from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { Navigate, useOutlet } from 'react-router-dom';
import Sidebar from 'components/Sidebar/Sidebar';
import TeacherSidebar from 'components/TeacherNavBar/TeacherNavBar';
import styles from './Root.module.css';

export function Root() {
  const outlet = useOutlet();
  const user = useSelector((state: RootState) => state.user.currentUser);

  if (!user) return <Navigate to="/auth" />;

  return (
    <>
      {user.role === 'student' ? <Sidebar /> : <TeacherSidebar />}
      <main className={styles['main-content']}>{outlet}</main>
    </>
  );
}
