import React, { useEffect, useState } from 'react';

import style from './ProgressBar.module.css';

const COLORS = {
  red: '#D76B65',
  blue: '#2D689F',
  green: '#37A169',
};

export function BarLegend() {
  const description = ['Menor a 70%', 'Menor a 90%', '90% o más'];
  return (
    <div className={style.legend}>
      {Object.keys(COLORS).map((color, i) => (
        <div className={style[color]}>
          <span>{description[i]}</span>
        </div>
      ))}
    </div>
  );
}

function getColor(percentage: number) {
  if (percentage < 70) return COLORS.red;
  if (percentage < 90) return COLORS.blue;
  return COLORS.green;
}

type Props = {
  percentage: number;
  textPosition: 'in' | 'up';
  textAdded?: string;
};

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
          {textPosition === 'in' && percentage >= 3 && (
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
