import React, { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

type Props = {
  title: string;
  childType?: 'nav' | 'backButton' | '';
  children?: ReactNode;
};

export default function SectionHeader({
  title,
  children,
  childType = '',
}: Props) {
  return (
    <div className={styles['assignment-header']}>
      <div
        className={`${styles['assignment-header-container']} ${styles[childType]}`}
      >
        <h1>{title}</h1>
        {children}
      </div>
      <hr />
    </div>
  );
}

SectionHeader.defaultProps = {
  children: null,
  childType: '',
};
