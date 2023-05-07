import React, { useEffect, useState } from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import CardSkeleton from 'components/CardSkeleton/CardSkeleton';
import JoinGroupForm from 'components/JoinGroupForm/JoinGroupForm';
import CreateGroupForm from 'components/CreateGroupForm/CreateGroupForm';

import { Subject } from 'types/Subject/Subject';
import { getSubjects } from 'utils/db/db.utils';

import styles from './Classes.module.css';

export default function Classes() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [classes, setClasses] = useState<Subject[]>([]);

  useEffect(() => {
    const getSubjectsList = async () => {
      const data = await getSubjects(user?.authToken as string);

      if (data.status === 'success') {
        setClasses(data.data as Subject[]);
      } else {
        console.log(data.data);
      }
    };

    getSubjectsList();
  }, []);

  return (
    <>
      <SectionHeader title="Mis Clases">
        {user?.role === 'teacher' ? (
          <CreateGroupForm classes={classes} />
        ) : (
          <JoinGroupForm />
        )}
      </SectionHeader>
      <div className={styles['card-container']}>
        <CardSkeleton items={4} />
      </div>
    </>
  );
}
