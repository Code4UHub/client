import React from 'react';
import {
  HomeworkQuestionList,
  HomeworkQuestion,
} from 'types/Questions/Question';
import QuestionTableRow from 'components/QuestionTableRow/QuestionTableRow';

import styles from './HomeworkQuestionListTable.module.css';

type Props = {
  questionList: HomeworkQuestionList;
  selectedQuestions: HomeworkQuestionList;
  onChecked: (question: HomeworkQuestion) => void;
  onUnchecked: (question_id: number) => void;
};

export default function HomeworkQuestionListTable({
  questionList,
  selectedQuestions,
  onChecked,
  onUnchecked,
}: Props) {
  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <th>Estado</th>
          <th>Pregunta</th>
          <th>Módulo</th>
          <th>Tipo</th>
          <th>Dificultad</th>
        </tr>
        {questionList.map((question) => (
          <QuestionTableRow
            questionObj={question}
            key={question.question_h_id}
            onChecked={onChecked}
            onUnchecked={onUnchecked}
            checked={selectedQuestions.includes(question)}
          />
        ))}
      </tbody>
    </table>
  );
}
