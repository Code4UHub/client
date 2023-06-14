import React from 'react';
import { Link } from 'react-router-dom';

import { formatDate, formatDateString } from 'utils/format/formatDate';

import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import {
  Homework,
  StudentAllHomeworks,
  StudentClassHomework,
  TeacherAllHomeworks,
} from 'types/Homework/Homework';
import NoResultsMessage from 'components/NoResultsMessage/NoResultsMessage';

import { ReactComponent as DoneIcon } from './Done.svg';

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
  homework:
    | Homework
    | StudentAllHomeworks
    | TeacherAllHomeworks
    | StudentClassHomework;
};

function isStudentAllHomeworks(
  homework:
    | Homework
    | StudentAllHomeworks
    | TeacherAllHomeworks
    | StudentClassHomework
): homework is StudentAllHomeworks {
  return 'class.class_id' in homework;
}

function isStudentHomeworks(
  homework:
    | Homework
    | StudentAllHomeworks
    | TeacherAllHomeworks
    | StudentClassHomework
): homework is StudentAllHomeworks | StudentClassHomework {
  return 'score' in homework;
}

function isTeacherAllHomeworks(
  homework:
    | Homework
    | StudentAllHomeworks
    | TeacherAllHomeworks
    | StudentClassHomework
): homework is TeacherAllHomeworks {
  return 'class_id' in homework;
}

function HomeWorkItem({ homework }: HomeworkItemProps) {
  const user = useSelector((state: RootState) => state.user.currentUser);

  return (
    <Link
      to={
        user?.role === 'teacher'
          ? `/classes/${(homework as TeacherAllHomeworks).class_id}/homework/${
              homework.homework_id
            }`
          : `/homework/${homework.homework_id}`
      }
      state={{ title: homework.title }}
      className={styles['item-container']}
    >
      <div className={styles['title-container']}>
        {isStudentHomeworks(homework) && (
          <DoneIcon
            className={`${styles['done-icon']} ${
              homework.score === 0 ? styles.hidden : ''
            }`}
          />
        )}
        <div>
          {isStudentAllHomeworks(homework) && (
            <span className={styles['title-tag']}>
              {homework['class.class_id']}
            </span>
          )}
          {isTeacherAllHomeworks(homework) && (
            <span className={styles['title-tag']}>{homework.class_id}</span>
          )}
          <span className={styles['homework-title']}>{homework.title}</span>
        </div>
      </div>
      <span className={styles.btn}>&gt;</span>
    </Link>
  );
}

type Props = {
  homeworkList: (
    | Homework
    | StudentAllHomeworks
    | TeacherAllHomeworks
    | StudentClassHomework
  )[][];
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
