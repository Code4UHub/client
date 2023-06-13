import React from 'react';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import HomeworkList from 'components/HomeworkList/HomeworkList';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { useAllHomeworkList } from 'hooks/useAllHomeworkList';
import {
  StudentAllHomeworks,
  TeacherAllHomeworks,
} from 'types/Homework/Homework';

import styles from './Homework.module.css';

export default function Homework() {
  const { homeworkList, isLoading } = useAllHomeworkList();

  return (
    <>
      <SectionHeader title="Mis Tareas" />
      {!isLoading ? (
        <HomeworkList
          homeworkList={
            homeworkList as (StudentAllHomeworks | TeacherAllHomeworks)[][]
          }
          className={styles['homework-list']}
        />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
