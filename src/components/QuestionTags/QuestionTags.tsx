import React from 'react';
import { QuestionDifficulty } from 'types/Questions/Question';

import { formatDifficulty } from 'utils/format/formatDifficulty';

import styles from './QuestionTags.module.css';

type Props = {
  topic: string;
  difficulty: QuestionDifficulty;
};

const getLevel = (difficulty: QuestionDifficulty) => {
  switch (difficulty) {
    case 1:
      return styles.easy;
    case 2:
      return styles.medium;
    default:
      return styles.hard;
  }
};

export default function QuestionTags({ topic, difficulty }: Props) {
  return (
    <div className={styles['tags-container']}>
      <span className={styles.topic}>{topic}</span>
      <span className={`${styles.level} ${getLevel(difficulty)}`}>
        {formatDifficulty(difficulty)}
      </span>
    </div>
  );
}
