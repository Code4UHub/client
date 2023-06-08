import React from 'react';

import styles from './LoadingSpinner.module.css';

type Props = {
  className?: string;
};

export default function LoadingSpinner({ className }: Props) {
  return <div className={`${styles.spinner} ${className}`} />;
}

LoadingSpinner.defaultProps = {
  className: '',
};
