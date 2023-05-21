import React, { useEffect } from 'react';

import Card from 'components/Card/Card';

import { getDummyData } from './dummyData';
import styles from './ClassProgress.module.css';

type Props = {
  className?: string;
};

export default function ClassProgress({ className }: Props) {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const getProgress = async () => {
      const data = (await getDummyData()) as number;
      setProgress(data);
    };

    getProgress();
  }, []);

  return (
    <Card className={`${styles.container} ${className}`}>
      <span>Has completado el</span>
      <span>{progress} %</span>
      <span>del curso</span>
    </Card>
  );
}

ClassProgress.defaultProps = {
  className: '',
};
