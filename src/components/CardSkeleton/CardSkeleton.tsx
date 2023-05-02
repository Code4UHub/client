import React from 'react';
import styles from './CardSkeleton.module.css';

type CardSkeletonProps = {
  items: number;
};

function Card() {
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

export default function CardSkeleton({ items }: CardSkeletonProps) {
  return (
    <>
      {Array.from({ length: items }, (_, index) => (
        <Card key={index} />
      ))}
    </>
  );
}
