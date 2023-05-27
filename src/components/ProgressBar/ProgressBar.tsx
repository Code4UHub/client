import React, { useEffect, useState } from 'react';

import style from './ProgressBar.module.css';

type Props = {
  percentage: number;
  textPosition: 'in' | 'up';
  textAdded?: string;
};

function getColor(percentage: number) {
  const red = '#D76B65';
  const blue = '#2D689F';
  const green = '#37A169';

  if (percentage < 70) return red;
  if (percentage < 90) return blue;
  return green;
}

export default function ProgressBar({
  percentage,
  textPosition,
  textAdded,
}: Props) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (progress < percentage) {
        setProgress(progress + 1);
      }
    }, 10);
  }, [progress, percentage]);

  const color = getColor(percentage);

  return (
    <div className={style.container}>
      {textPosition === 'up' && (
        <div className={style['up-text-container']}>
          <span
            className={style[`${textPosition}-percentage`]}
            style={{ color }}
          >
            {`${percentage}% `}
          </span>
          <span className={style[`${textPosition}-text`]}>
            &nbsp;{textAdded}
          </span>
        </div>
      )}
      <div className={style['bar-background']}>
        <div
          className={style['bar-progress']}
          style={{
            width: `${progress}%`,
            backgroundColor: color,
          }}
        >
          {textPosition === 'in' && (
            <>
              <span className={style[`${textPosition}-percentage`]}>
                {`${percentage}% `}
              </span>
              <span className={style[`${textPosition}-text`]}>
                &nbsp;{textAdded}
              </span>
            </>
          )}
          <div />
        </div>
      </div>
    </div>
  );
}

ProgressBar.defaultProps = {
  textAdded: '',
};
