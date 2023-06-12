import React, { useEffect, useState } from 'react';
import { RootState } from 'store/store';
import { useSelector, useDispatch } from 'react-redux';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import CardSkeleton from 'components/CardSkeleton/CardSkeleton';
import ClassCard from 'components/ClassCard/ClassCard';
import JoinGroupForm from 'components/JoinGroupForm/JoinGroupForm';
import CreateGroupForm from 'components/CreateGroupForm/CreateGroupForm';
import NoResultsMessage from 'components/NoResultsMessage/NoResultsMessage';

import { Subject } from 'types/Subject/Subject';
import {
  StudentClass,
  TeacherClass,
  StudentClassListPromise,
  TeacherClassListPromise,
} from 'types/Class/Class';
import {
  getSubjects,
  getStudentClassList,
  getTeacherClassList,
} from 'utils/db/db.utils';

import { updateSubjects } from 'store/subject/subjectSlice';

import styles from './Classes.module.css';

type CardListProps = {
  classList: StudentClass[] | TeacherClass[];
};

function ClassCardList({ classList }: CardListProps) {
  return classList.length > 0 ? (
    <>
      {classList.map((classItem) => (
        <ClassCard
          key={classItem.class_id}
          classInfo={classItem}
        />
      ))}
    </>
  ) : (
    <NoResultsMessage
      message="Unéte a una clase para comenzar 💡"
      className={styles['no-results']}
    />
  );
}

export default function Classes() {
  const [classList, setclassList] = useState<StudentClass[] | TeacherClass[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const getClassList = async () => {
    setIsLoading(true);
    let data: TeacherClassListPromise | StudentClassListPromise;

    if (user?.role === 'teacher') {
      data = await getTeacherClassList(user.id, user.authToken);
    } else {
      data = await getStudentClassList(
        user?.id as string,
        user?.authToken as string
      );
    }

    if (data.status === 'success' && typeof data.data !== 'string') {
      setclassList(data.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const getSubjectsList = async () => {
      const data = await getSubjects(user?.authToken as string);

      if (data.status === 'success') {
        dispatch(updateSubjects(data.data as Subject[]));
      }
    };

    if (user?.role === 'teacher') getSubjectsList();

    getClassList();
  }, []);

  return (
    <>
      <SectionHeader title="Mis Clases">
        {user?.role === 'teacher' ? (
          <CreateGroupForm onComplete={getClassList} />
        ) : (
          <JoinGroupForm onComplete={getClassList} />
        )}
      </SectionHeader>
      <div className={styles['card-container']}>
        {isLoading ? (
          <CardSkeleton items={4} />
        ) : (
          <ClassCardList classList={classList} />
        )}
      </div>
    </>
  );
}
