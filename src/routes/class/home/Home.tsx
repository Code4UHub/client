import React from 'react';

import ClassProgress from 'components/ClassProgress/ClassProgress';

import styles from './Home.module.css';

export default function Home() {
  return (
    <section className={styles['home-container']}>
      <ClassProgress className={styles['home-container-item']} />
      <div className={styles['home-container-item']}>Hola</div>
      <div className={styles['home-container-item']}>Hola</div>
      <div className={styles['home-container-item']}>Hola</div>
    </section>
  );
}
