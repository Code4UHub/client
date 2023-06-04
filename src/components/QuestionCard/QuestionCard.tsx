import React from 'react';

import Card from 'components/Card/Card';

// TODO: Remove DummyData Question Type
import { Question } from 'routes/homework/dummyData';

import { ReactComponent as IconDelete } from './Delete.svg';

import styles from './QuestionCard.module.css';

type QuestionCardProps = {
  question: Question;
  onDelete: Function;
};

export default function QuestionCard({
  question,
  onDelete,
}: QuestionCardProps) {
  return (
    <Card className={styles['question-card']}>
      <span className={styles['question-id']}>{question.id}.</span>
      <div>
        <div className={styles['question-tags']}>
          <span className={`${styles.tag} ${styles.module}`}>
            {question.module}
          </span>
          <span className={`${styles.tag} ${styles.type}`}>
            {question.type}
          </span>
        </div>
        <span
          className={styles['question-title']}
          title={question.title}
        >
          {question.title}
        </span>
      </div>
      <button
        type="button"
        className={styles['question-delete']}
        onClick={() => onDelete(question)}
      >
        <IconDelete />
      </button>
    </Card>
  );
}
