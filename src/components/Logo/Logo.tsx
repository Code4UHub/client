import React from 'react';
import whiteLogo from './whiteLogo.svg';
import blueLogo from './blueLogo.svg';
import styles from './Logo.module.css';

type Props = {
  type: string;
  position: string;
};

export function Logo({ type, position }: Props) {
  if (position === 'auth') {
    return (
      <div className={`${styles['logo-container']} ${styles[type]}`}>
        <img
          alt="Code4U Logo"
          src={type === 'blue' ? blueLogo : whiteLogo}
        />
      </div>
    );
  }
  return (
    <img
      alt="Code4U Logo"
      src={type === 'blue' ? blueLogo : whiteLogo}
    />
  );
}
