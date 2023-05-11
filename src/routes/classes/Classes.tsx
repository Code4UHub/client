import React, { useEffect } from 'react';
import { RootState } from 'store/store';
import { useSelector, useDispatch } from 'react-redux';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import CardSkeleton from 'components/CardSkeleton/CardSkeleton';
import JoinGroupForm from 'components/JoinGroupForm/JoinGroupForm';
import CreateGroupForm from 'components/CreateGroupForm/CreateGroupForm';

import { Subject } from 'types/Subject/Subject';
import { getSubjects } from 'utils/db/db.utils';

import { updateSubjects } from 'store/subject/subjectSlice';

import styles from './Classes.module.css';

export default function Classes() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSubjectsList = async () => {
      const data = await getSubjects(user?.authToken as string);

      if (data.status === 'success') {
        dispatch(updateSubjects(data.data as Subject[]));
      }
    };

    getSubjectsList();
  }, []);

  return (
    <>
      <SectionHeader title="Mis Clases">
        {user?.role === 'teacher' ? <CreateGroupForm /> : <JoinGroupForm />}
      </SectionHeader>
      <div className={styles['card-container']}>
        <CardSkeleton items={4} />
      </div>
      <button
        type="button"
        onClick={() => setSection('requests')}
      >
        Mis solicitudes
      </button>
    </>
  );
}
