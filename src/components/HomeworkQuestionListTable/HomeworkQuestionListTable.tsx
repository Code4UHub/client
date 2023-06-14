import React, { useState, useMemo } from 'react';
import {
  HomeworkQuestionList,
  OpenHomeworkQuestion,
  ClosedHomeworkQuestion,
} from 'types/Questions/Question';
import { ListItem } from 'types/ListItem/ListItem';

import QuestionTableRow from 'components/QuestionTableRow/QuestionTableRow';
import Pagination from 'components/Pagination/Pagination';
import FilterDropdownButton from 'components/FilterDropdownButton/FilterDropdownButton';

import { ReactComponent as SearchIcon } from './Search.svg';
import styles from './HomeworkQuestionListTable.module.css';

const QUESTION_TYPE_LIST: ListItem[] = [
  {
    id: 'open',
    value: 'abierta',
  },
  {
    id: 'closed',
    value: 'cerrada',
  },
];

const ROWS_PER_PAGE = 10;

type FilterOptions = {
  title: string;
  topic: ListItem | undefined;
  type: 'open' | 'closed' | undefined;
};

type Props = {
  modules: ListItem[];
  questionList: HomeworkQuestionList;
  selectedQuestions: HomeworkQuestionList;
  onChecked: (question: OpenHomeworkQuestion | ClosedHomeworkQuestion) => void;
  onUnchecked: (question_id: number) => void;
};

export default function HomeworkQuestionListTable({
  modules,
  questionList,
  selectedQuestions,
  onChecked,
  onUnchecked,
}: Props) {
  const [activePage, setActivePage] = useState(1);
  const [tableFilterOptions, setTableFilterOptions] = useState<FilterOptions>({
    title: '',
    topic: undefined,
    type: undefined,
  });

  const filteredList = useMemo(() => {
    const { title, topic, type } = tableFilterOptions;

    if (!title && !topic && !type) return [...questionList];

    return questionList.filter((question) => {
      const formatedTitle =
        `${question.question_h_id}. ${question.question.title}`
          .replace(/\s/g, '')
          .toLocaleLowerCase();
      const formatedQuestionTitle = title
        .replace(/\s/g, '')
        .toLocaleLowerCase();

      if (title && !formatedTitle.includes(formatedQuestionTitle)) return false;

      if (topic && question.module_id !== topic.id) return false;

      if (type && question.type !== type) return false;

      setActivePage(1);
      return true;
    });
  }, [tableFilterOptions, questionList]);

  const numberOfPages =
    filteredList.length % ROWS_PER_PAGE !== 0
      ? Math.floor(filteredList.length / ROWS_PER_PAGE) + 1
      : filteredList.length / ROWS_PER_PAGE;

  const paginatedRows = filteredList.filter(
    (_question, index) =>
      index >= (activePage - 1) * ROWS_PER_PAGE &&
      index < (activePage - 1) * ROWS_PER_PAGE + ROWS_PER_PAGE
  );

  const tableRows =
    paginatedRows.length > 0 ? (
      paginatedRows.map((question) => (
        <QuestionTableRow
          questionObj={question}
          key={question.question_h_id}
          onChecked={onChecked}
          onUnchecked={onUnchecked}
          checked={selectedQuestions.includes(question)}
        />
      ))
    ) : (
      <tr className={styles['no-results']}>
        <td colSpan={4}>Sin resultados</td>
      </tr>
    );

  return (
    <div>
      <div className={styles['filter-container']}>
        <FilterDropdownButton
          list={QUESTION_TYPE_LIST}
          placeholder="Tipo de Pregunta"
          value={tableFilterOptions.type || ''}
          onChange={(newType) =>
            setTableFilterOptions((options) => ({
              ...options,
              type: newType ? (newType.id as 'open' | 'closed') : undefined,
            }))
          }
        />
        <FilterDropdownButton
          list={modules}
          placeholder="Módulo"
          value={tableFilterOptions.topic?.value || ''}
          onChange={(newTopic) =>
            setTableFilterOptions((options) => ({
              ...options,
              topic: newTopic,
            }))
          }
        />
        <div className={styles['search-container']}>
          <SearchIcon />
          <input
            type="text"
            onChange={(e) =>
              setTableFilterOptions((options) => ({
                ...options,
                title: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className={styles['table-container']}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Estado</th>
              <th>Pregunta</th>
              <th>Módulo</th>
              <th>Tipo</th>
            </tr>
            {tableRows}
          </tbody>
        </table>
      </div>
      {paginatedRows.length > 0 && (
        <Pagination
          pages={numberOfPages}
          selectedPage={activePage}
          onChange={(newPage) => setActivePage(newPage)}
        />
      )}
    </div>
  );
}
