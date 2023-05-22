import React from 'react';

import styles from './Card.module.css';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function Card({ className, children }: Props) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}

Card.defaultProps = {
  className: '',
};
