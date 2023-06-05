import React, { useState } from 'react';
import {
  HomeworkQuestionList,
  HomeworkQuestion,
} from 'types/Questions/Question';
import QuestionTableRow from 'components/QuestionTableRow/QuestionTableRow';
import Pagination from 'components/Pagination/Pagination';

import styles from './HomeworkQuestionListTable.module.css';

const ROWS_PER_PAGE = 10;

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
  const [activePage, setActivePage] = useState(1);

  const numberOfPages =
    questionList.length % ROWS_PER_PAGE !== 0
      ? Math.floor(questionList.length / ROWS_PER_PAGE) + 1
      : questionList.length / ROWS_PER_PAGE;

  const paginatedRows = questionList.filter(
    (_question, index) =>
      index >= (activePage - 1) * ROWS_PER_PAGE &&
      index < (activePage - 1) * ROWS_PER_PAGE + ROWS_PER_PAGE
  );

  return (
    <div>
      <div className={styles['table-container']}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Estado</th>
              <th>Pregunta</th>
              <th>Módulo</th>
              <th>Tipo</th>
              <th>Dificultad</th>
            </tr>
            {paginatedRows.map((question) => (
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
      </div>
      <Pagination
        pages={numberOfPages}
        selectedPage={activePage}
        onChange={(newPage) => setActivePage(newPage)}
      />
    </div>
  );
}
