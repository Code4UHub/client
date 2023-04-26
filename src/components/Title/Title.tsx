import React from 'react';
import styles from './Title.module.css';

type Props = {
  title: string;
};

export default function Title({ title }: Props) {
  return (
    <div className={styles.title}>
      <h1>{title}</h1>
      <hr />
    </div>
  );
}
