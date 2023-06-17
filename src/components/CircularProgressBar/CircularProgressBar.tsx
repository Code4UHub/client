import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

type Props = {
  percentage: number;
  className?: string;
};

export function CircularProgressBar({ className, percentage }: Props) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      if (progress < percentage) {
        setProgress(progress + 1);
      }
    }, 15);
  }, [progress]);

  return (
    <div className={className}>
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        strokeWidth={12}
        styles={buildStyles({
          textColor: 'black',
          pathColor: '#2D689F',
          trailColor: '#D9D9D9',
        })}
      />
    </div>
  );
}

CircularProgressBar.defaultProps = {
  className: '',
};
