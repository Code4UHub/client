import React from 'react';

import Card from 'components/Card/Card';

import {
  ClosedChallengeQuestion,
  ClosedHomeworkQuestion,
  OpenChallengeQuestion,
  OpenHomeworkQuestion,
  isChallengeQuestion,
} from 'types/Questions/Question';

import { ReactComponent as IconDelete } from './Delete.svg';
import styles from './QuestionCard.module.css';

type QuestionCardProps = {
  question:
    | OpenHomeworkQuestion
    | ClosedChallengeQuestion
    | ClosedHomeworkQuestion
    | OpenChallengeQuestion;
  onDelete: Function;
};

export default function QuestionCard({
  question,
  onDelete,
}: QuestionCardProps) {
  return (
    <Card className={styles['question-card']}>
      <span className={styles['question-id']}>
        {isChallengeQuestion(question)
          ? question.question_id
          : question.question_h_id}
        .
      </span>
      <div>
        <div className={styles['question-tags']}>
          <span className={`${styles.tag} ${styles.module}`}>
            {question.title}
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
        onClick={() =>
          onDelete(
            isChallengeQuestion(question)
              ? question.question_id
              : question.question_h_id
          )
        }
      >
        <IconDelete />
      </button>
    </Card>
  );
}
