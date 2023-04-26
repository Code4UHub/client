import React from 'react';
import { Button } from 'components/Button/Button';
import styles from './AssignmentHeader.module.css';

type Props = {
  title: string;
  onClickButton: () => void;
  isButtonDisabled: boolean;
};

export default function AssignmentHeader({
  title,
  onClickButton,
  isButtonDisabled,
}: Props) {
  return (
    <div className={styles['assignment-header']}>
      <div className={styles['assignment-header-container']}>
        <h1>{title}</h1>
        <Button
          location="assignmentSubmit"
          text="Terminar examen"
          onClickHandler={onClickButton}
          type="submit"
          isDisable={isButtonDisabled}
        />
      </div>
      <hr />
    </div>
  );
}
