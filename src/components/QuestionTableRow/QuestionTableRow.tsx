import React from 'react';

import {
  ClosedHomeworkQuestion,
  OpenHomeworkQuestion,
} from 'types/Questions/Question';

import styles from './QuestionTableRow.module.css';

type HomeworkQuestion = ClosedHomeworkQuestion | OpenHomeworkQuestion;

type QuestionTableRowProps = {
  questionObj: HomeworkQuestion;
  checked: boolean;
  onChecked: (question: HomeworkQuestion) => void;
  onUnchecked: (question_id: number) => void;
};

export default function QuestionTableRow({
  questionObj,
  checked,
  onChecked,
  onUnchecked,
}: QuestionTableRowProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { question_h_id, question, type, difficulty_id } = questionObj;

  const { title, topic } = question;

  const handleCheckBox = () => {
    if (checked) {
      onUnchecked(questionObj.question_h_id);
    } else {
      onChecked(questionObj);
    }
  };

  return (
    <tr className={`${styles['table-row']} ${checked ? styles.selected : ''}`}>
      <td>
        <input
          type="checkbox"
          checked={checked}
          onClick={handleCheckBox}
          onChange={() => {}}
        />
      </td>
      <td
        title={`${question_h_id}. ${title}`}
      >{`${question_h_id}. ${title}`}</td>
      <td title={topic}>{topic}</td>
      <td>{type}</td>
      <td>{difficulty_id}</td>
    </tr>
  );
}
