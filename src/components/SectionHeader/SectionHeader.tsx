import React, { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

type Props = {
  title: string;
  children?: ReactNode;
};

export default function SectionHeader({ title, children }: Props) {
  return (
    <div className={styles['assignment-header']}>
      <div className={styles['assignment-header-container']}>
        <h1>{title}</h1>
        {children}
      </div>
      <hr />
    </div>
  );
}

SectionHeader.defaultProps = {
  children: null,
};
