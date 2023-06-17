import React from 'react';
import Feedback from 'components/Feedback/Feedback';
import style from './RadioInput.module.css';

type Props = {
  index: number;
  optionText: string;
  isChecked: boolean;
  isDisable: boolean;
  isCorrect: boolean;
  explanationText: string;
  onClick: (index: number) => void;
};

export default function RadioInput({
  onClick,
  index,
  optionText,
  explanationText,
  isChecked,
  isDisable,
  isCorrect,
}: Props) {
  return (
    <div className={style.radioInput}>
      <input
        type="radio"
        id={index.toString()}
        disabled={isDisable}
        name="drone"
        value={optionText}
        checked={isChecked}
        onChange={(e) => onClick(Number(e.target.id))}
      />
      <label htmlFor={index.toString()}>{optionText}</label>
      {isDisable && isChecked && (
        <Feedback
          type={isCorrect ? 'correct' : 'incorrect'}
          text={explanationText}
        />
      )}
    </div>
  );
}
