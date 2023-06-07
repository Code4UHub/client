import React from 'react';
import { Link } from 'react-router-dom';

import { formatDate } from 'utils/format/formatDate';

import { Homework } from 'types/Homework/Homework';

import styles from './HomeworkList.module.css';

type HeaderProps = {
  date: Date;
};

function HomeworkDateHeader({ date }: HeaderProps) {
  return (
    <div className={styles['date-header']}>
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
      to="homework"
      className={styles['item-container']}
    >
      <span>{homework.homework_name}</span>
      <span>&gt;</span>
    </Link>
  );
}

type Props = {
  homeworkList: Homework[][];
};

export default function HomeworkList({ homeworkList }: Props) {
  return (
    <ol className={`${styles.container} ${styles.content}`}>
      {homeworkList.map((homeWorkGroup, index) => (
        <li key={index}>
          <div>
            <HomeworkDateHeader date={homeWorkGroup[0].date} />
            <ul className={styles.container}>
              {homeWorkGroup.map((homework) => (
                <li key={homework.homework_id}>
                  <HomeWorkItem homework={homework} />
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
