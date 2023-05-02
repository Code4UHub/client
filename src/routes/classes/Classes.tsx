import React from 'react';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import CardSkeleton from 'components/CardSkeleton/CardSkeleton';

import styles from './Classes.module.css';

export default function Classes() {
  return (
    <>
      <SectionHeader title="Mis Clases" />
      <div className={styles['card-container']}>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </>
  );
}
