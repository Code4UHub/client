import React from 'react';

import Card from 'components/Card/Card';
import { CircularProgressBar } from 'components/CircularProgressBar/CircularProgressBar';

import { useNavigate } from 'react-router-dom';

import { ReactComponent as LockIcon } from 'routes/modules/lock.svg';

import { StudentModule } from 'types/Module/Module';

import style from './ModuleStudents.module.css';

type Props = {
  data: StudentModule[];
  cardStyles: (index: number) => string;
};

export function ModuleStudents({ data, cardStyles }: Props) {
  const navigate = useNavigate();

  const handleNavigate = (i: number) => {
    const titles = data.map((module) => module.title);
    navigate(`../topics`, {
      replace: false,
      state: { initialIndex: i, titles },
    });
  };

  return (
    <div className={style.modules}>
      {data.map((module, i) => (
        <Card key={module.title}>
          {/* eslint-disable-next-line */}
          <div
            className={cardStyles(i)}
            onClick={() => handleNavigate(i)}
          >
            <h2 className={style.title}>
              {i + 1}. {module.title}
            </h2>
            <div className={style['icon-container']}>
              {data[i].is_active ? (
                <CircularProgressBar
                  className={style['progress-bar']}
                  percentage={data[i].percentage as number}
                />
              ) : (
                <LockIcon className={style.icon} />
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
