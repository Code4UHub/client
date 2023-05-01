import React from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { Navigate, useOutlet } from 'react-router-dom';
import NavBar from 'components/NavBar/NavBar';
import styles from './Root.module.css';

export function Root() {
  const outlet = useOutlet();
  const user = useSelector((state: RootState) => state.currentUser);

  if (!user) return <Navigate to="/auth" />;

  return (
    <>
      <NavBar />
      <main className={styles['main-content']}>{outlet}</main>
    </>
  );
}
