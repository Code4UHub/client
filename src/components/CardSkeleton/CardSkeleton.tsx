import React from 'react';
import styles from './CardSkeleton.module.css';

export default function CardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={`${styles.content} ${styles.subtitle}`} />
      <div className={`${styles.content} ${styles.title}`} />
      <div className={`${styles.content} ${styles['sub-content']}`} />
      <div className={`${styles.content} ${styles['sub-content']}`} />
      <div className={`${styles.content} ${styles['sub-sub-content']}`} />
      <div className={`${styles.content} ${styles['button-content']}`} />
    </div>
  );
}
