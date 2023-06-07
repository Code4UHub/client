import React from 'react';
import RadioInput from 'components/RadioInput/RadioInput';
// TODO: Move to Question
import { Option } from 'types/Questions/CloseQuestion';
import { ClosedHomeworkQuestion } from 'types/Questions/Question';

import QuestionTags from 'components/QuestionTags/QuestionTags';

import style from './CloseQuestion.module.css';

type Props = {
  questionIndex: number;
  chosenAnswer: number;
  rightAnswer: number;
  questionData: ClosedHomeworkQuestion;
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
        topic={questionData.title}
        difficulty={questionData.difficulty_id}
      />
      <code>{questionData.question.description.replace(/\r/g, '\n')}</code>
      <div className={style.options}>
        {options.map((option, index) => (
          <RadioInput
            isDisable={isSubmitted}
            key={`${questionData.question_h_id}${option.text}`}
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
