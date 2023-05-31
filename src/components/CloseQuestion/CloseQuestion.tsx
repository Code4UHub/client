import React from 'react';
import RadioInput from 'components/RadioInput/RadioInput';
import { Option } from 'types/Questions/CloseQuestion';
import QuestionTags from 'components/QuestionTags/QuestionTags';
import { Question } from 'types/Questions/Question';
import style from './CloseQuestion.module.css';

type Props = {
  questionIndex: number;
  chosenAnswer: number;
  rightAnswer: number;
  questionData: Question;
  options: Option[];
  isSubmitted: boolean;
  onChoose: (id: number, option: number) => void;
};

export default function CloseQuestion({
  questionIndex,
  options,
  onChoose,
  questionData,
  chosenAnswer,
  rightAnswer,
  isSubmitted,
}: Props) {
  const onClickHandler = (indexOption: number) => {
    onChoose(questionIndex, indexOption);
  };

  return (
    <div className={style['close-question']}>
      <QuestionTags
        topic={questionData.topic}
        difficulty={questionData.difficulty}
      />
      <h2>{questionData.description}</h2>
      <div className={style.options}>
        {options.map((option, index) => (
          <RadioInput
            isDisable={isSubmitted}
            key={`${questionData.id}${option.text}`}
            onClick={onClickHandler}
            isChecked={chosenAnswer === index}
            isCorrect={rightAnswer === chosenAnswer}
            index={index}
            optionText={option.text}
            explanationText={option.explanation}
          />
        ))}
      </div>
    </div>
  );
}
