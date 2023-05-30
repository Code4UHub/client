import React, { useEffect } from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';

import Card from 'components/Card/Card';

import { getDummyData } from './dummyData';
import styles from './ClassProgressCard.module.css';

type Props = {
  className?: string;
};

export default function ClassProgressCard({ className }: Props) {
  const [progress, setProgress] = React.useState(0);
  const user = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    const getProgress = async () => {
      const data = (await getDummyData()) as number;
      setProgress(data);
    };

    getProgress();
  }, []);

  return (
    <Card className={`${styles.container} ${className}`}>
      <span>
        {user?.role === 'student' ? 'Has completado' : 'Avance del grupo'}
      </span>
      <span>{progress} %</span>
      <span>del curso {user?.role === 'teacher' ? 'total' : ''} </span>
    </Card>
  );
}

ClassProgressCard.defaultProps = {
  className: '',
};
