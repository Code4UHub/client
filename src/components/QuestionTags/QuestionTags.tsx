import React from 'react';
import { Difficulty } from 'types/Questions/Question';

import styles from './QuestionTags.module.css';

type Props = {
  topic: string;
  difficulty: Difficulty;
};

const getLevel = (difficulty: Difficulty) => {
  if (difficulty === 'Fácil') return styles.easy;
  if (difficulty === 'Medio') return styles.medium;
  return styles.hard;
};

export default function QuestionTags({ topic, difficulty }: Props) {
  return (
    <div className={styles['tags-container']}>
      <span className={styles.topic}>{topic}</span>
      <span className={`${styles.level} ${getLevel(difficulty)}`}>
        {difficulty}
      </span>
    </div>
  );
}
