import React from 'react';

import styles from './NoResults.module.css';

type Props = {
  className?: string;
  message: string;
};

export default function NoResultsMessage({ className, message }: Props) {
  return (
    <div className={`${styles.container} ${className}`}>
      <span> {message} 🎉</span>
    </div>
  );
}
NoResultsMessage.defaultProps = {
  className: '',
};
