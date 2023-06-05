import React from 'react';

import Card from 'components/Card/Card';

import { HomeworkQuestion } from 'types/Questions/Question';

import { ReactComponent as IconDelete } from './Delete.svg';
import styles from './QuestionCard.module.css';

type QuestionCardProps = {
  question: HomeworkQuestion;
  onDelete: Function;
};

export default function QuestionCard({
  question,
  onDelete,
}: QuestionCardProps) {
  return (
    <Card className={styles['question-card']}>
      <span className={styles['question-id']}>{question.question_h_id}.</span>
      <div>
        <div className={styles['question-tags']}>
          <span className={`${styles.tag} ${styles.module}`}>
            {question.question.topic}
          </span>
          <span className={`${styles.tag} ${styles.type}`}>
            {question.type}
          </span>
        </div>
        <span
          className={styles['question-title']}
          title={question.question.title}
        >
          {question.question.title}
        </span>
      </div>
      <button
        type="button"
        className={styles['question-delete']}
        onClick={() => onDelete(question.question_h_id)}
      >
        <IconDelete />
      </button>
    </Card>
  );
}
