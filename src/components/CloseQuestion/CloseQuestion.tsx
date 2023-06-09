import React, { useRef, useEffect } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { basicSetup } from 'codemirror';
import { tomorrow } from 'thememirror';

import RadioInput from 'components/RadioInput/RadioInput';
import { Option } from 'types/Questions/CloseQuestion';
import {
  ClosedChallengeQuestion,
  ClosedHomeworkQuestion,
  isClosedHomeworkQuestion,
} from 'types/Questions/Question';

import QuestionTags from 'components/QuestionTags/QuestionTags';

import style from './CloseQuestion.module.css';

type Props = {
  questionIndex: number;
  chosenAnswer: number;
  questionData: ClosedHomeworkQuestion | ClosedChallengeQuestion;
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
  isSubmitted,
}: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorView>();

  const [description, ...code] = questionData.question.description.split('\r');

  useEffect(() => {
    editorRef.current = new EditorView({
      doc: code.join('\r').trim(),
      extensions: [
        basicSetup,
        python(),
        EditorView.lineWrapping,
        tomorrow,
        EditorState.readOnly.of(true),
      ],
      parent: parentRef.current as Element,
    });

    return function destroyEditor() {
      editorRef.current?.destroy();
    };
  }, [editorRef]);

  const onClickHandler = (indexOption: number) => {
    onChoose(questionIndex, indexOption);
  };

  return (
    <div className={style['close-question']}>
      <QuestionTags
        topic={questionData.title}
        difficulty={questionData.difficulty_id}
      />
      <h3 className={style.title}>{questionData.question.title}</h3>
      {code.length > 0 ? (
        <div>
          <p className={style.description}>{description}</p>
          <div
            ref={parentRef}
            className={style['code-editor']}
          />
        </div>
      ) : (
        <p className={style.description}>{questionData.question.description}</p>
      )}
      <div className={style.options}>
        {options.map((option, index) => (
          <RadioInput
            isDisable={isSubmitted}
            key={`${
              isClosedHomeworkQuestion(questionData)
                ? questionData.question_h_id
                : questionData.question_id
            }${option.text}`}
            onClick={onClickHandler}
            isChecked={chosenAnswer === index}
            isCorrect={chosenAnswer === questionData.question.answer - 1}
            index={index}
            optionText={option.text}
            explanationText={option.explanation}
          />
        ))}
      </div>
    </div>
  );
}
