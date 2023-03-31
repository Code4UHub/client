import React from 'react';
import styles from './SideBarHero.module.css';

type Props = {
  type: string;
};

export function SideBarHero({ type }: Props) {
  return (
    <aside className={styles.aside}>
      <p>Side Bar content: {type}</p>
      <button type="button">{type}</button>
    </aside>
  );
}
