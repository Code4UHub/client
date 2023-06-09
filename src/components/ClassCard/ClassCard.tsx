import React from 'react';
import { Link } from 'react-router-dom';

import { formatDays } from 'utils/format/formatDays';
import { formatTime } from 'utils/format/formatTime';

import { colorHash } from 'utils/colorHash/colorHash';

import { StudentClass, TeacherClass } from 'types/Class/Class';
import Card from 'components/Card/Card';

import styles from './ClassCard.module.css';

function isStudent(
  classInfo: StudentClass | TeacherClass
): classInfo is StudentClass {
  return 'teacher_name' in classInfo;
}

type Props = {
  classInfo: StudentClass | TeacherClass;
};

export default function ClassCard({ classInfo }: Props) {
  if (classInfo.is_finished) return null;

  return (
    <Card className={styles.card}>
      <div
        className={styles['color-bar']}
        style={{ backgroundColor: colorHash(classInfo.subject_name) }}
      />
      <div
        className={`${styles['card-container']} ${
          isStudent(classInfo) && classInfo.pending ? styles.pending : ''
        }`}
      >
        <span className={styles['pending-tag']}>Pendiente</span>
        {isStudent(classInfo) && classInfo.pending ? (
          <span
            className={`${styles['class-link']} ${styles['class-link-pending']}`}
          >
            {classInfo.subject_name}
          </span>
        ) : (
          <Link
            to={`/classes/${classInfo.class_id}`}
            className={styles['class-link']}
            title={classInfo.subject_name}
          >
            <span>{classInfo.subject_name}</span>
          </Link>
        )}
        <span>{classInfo.class_id}</span>
        {isStudent(classInfo) && (
          <span className={styles['teacher-name']}>
            {classInfo.teacher_name}
          </span>
        )}
        <span>{formatDays(classInfo.days)}</span>
        <span>{`${formatTime(classInfo.start_time)} - ${formatTime(
          classInfo.end_time
        )}`}</span>
      </div>
    </Card>
  );
}
