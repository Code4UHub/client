import React from 'react';
import { Link } from 'react-router-dom';

import { formatDate, formatDateString } from 'utils/format/formatDate';

import { Homework } from 'types/Homework/Homework';
import NoResultsMessage from 'components/NoResultsMessage/NoResultsMessage';

import styles from './HomeworkList.module.css';

type HeaderProps = {
  date: string;
};

function HomeworkDateHeader({ date }: HeaderProps) {
  return (
    <div className={styles['date-header']}>
      {formatDate(date) ===
        formatDate(formatDateString(new Date(Date.now()))) && (
        <span className={styles.today}>Hoy,&nbsp;</span>
      )}
      <span>{formatDate(date)}</span>
      <hr />
    </div>
  );
}

type HomeworkItemProps = {
  homework: Homework;
};

function HomeWorkItem({ homework }: HomeworkItemProps) {
  return (
    <Link
      to={`/homework/${homework.homework_id}`}
      className={styles['item-container']}
    >
      <span>{homework.title}</span>
      <span>&gt;</span>
    </Link>
  );
}

type Props = {
  homeworkList: Homework[][];
  className?: string;
};

export default function HomeworkList({ homeworkList, className }: Props) {
  return (
    <div
      className={`${styles.content} ${className} ${
        homeworkList.length === 0 ? styles.center : ''
      }`}
    >
      <ol className={styles.container}>
        {homeworkList.length > 0 ? (
          homeworkList.map((homeWorkGroup, index) => (
            <li key={index}>
              <div>
                <HomeworkDateHeader date={homeWorkGroup[0].deadline} />
                <ul className={styles.container}>
                  {homeWorkGroup.map((homework) => (
                    <li key={homework.homework_id}>
                      <HomeWorkItem homework={homework} />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))
        ) : (
          <NoResultsMessage
            message="No hay tareas pendientes 😀"
            className={styles['no-results']}
          />
        )}
      </ol>
    </div>
  );
}
HomeworkList.defaultProps = {
  className: '',
};
