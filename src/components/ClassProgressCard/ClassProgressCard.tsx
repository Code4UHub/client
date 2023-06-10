import React, { useEffect, useState } from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getClassProgress, getStudentProgress } from 'utils/db/db.utils';
import Card from 'components/Card/Card';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

import styles from './ClassProgressCard.module.css';

type Props = {
  className?: string;
};

export default function ClassProgressCard({ className }: Props) {
  const [progress, setProgress] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const user = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    const getProgress = async () => {
      setIsLoading(true);

      let data;

      if (user?.role === 'teacher') {
        data = await getClassProgress(
          user?.authToken as string,
          params?.id as string,
          user?.id as string
        );
      } else {
        data = await getStudentProgress(
          user?.authToken as string,
          params?.id as string,
          user?.id as string
        );
      }

      if (data.status === 'success' && typeof data.data !== 'string') {
        setProgress(data.data);
      }
      setIsLoading(false);
    };

    getProgress();
  }, []);

  return (
    <Card className={`${styles.container} ${className}`}>
      <span>
        {user?.role === 'student' ? 'Has completado' : 'Avance del grupo'}
      </span>
      {isLoading ? <LoadingSpinner /> : <span>{progress.toFixed(1)} %</span>}

      <span>del curso {user?.role === 'teacher' ? 'total' : ''} </span>
    </Card>
  );
}

ClassProgressCard.defaultProps = {
  className: '',
};
