import React from "react";
import RadioInput from "components/RadioInput/RadioInput";
import style from './CloseQuestion.module.css';

type Props = {
  questionIndex: number;
  description: string;
  answer: number;
  options: {text: string, explanation: string}[];
  onChoose: (id: number, option: number) => void;
}

export default function CloseQuestion({questionIndex, description, options, onChoose, answer}: Props) {

  const onClickHandler = (indexOption: number) => {
    onChoose(questionIndex, indexOption);
  }

  return (
    <div className={style['close-question']}>
      <h2>{description}</h2>
      <div className={style.options}>
         {/* eslint-disable */ }
        {options.map((option, index) => (
          <RadioInput
            key={`${questionIndex}option${index}`}
            onClick={onClickHandler}
            isChecked={answer === index}
            index={index}
            text={option.text}
          />
          )
        )}
      </div>
    </div>
  )
}