import React from 'react';
import Card from 'components/Card/Card';
import { ReactComponent as LockIcon } from 'routes/modules/lock.svg';
import { CircularProgressBar } from 'components/CircularProgressBar/CircularProgressBar';
import { StudentModule } from 'types/Module/Module';

import style from './ModuleStudents.module.css';

type Props = {
  data: StudentModule[];
  moduleState: boolean[];
  cardStyles: (index: number) => string;
};

export function ModuleStudents({ data, moduleState, cardStyles }: Props) {
  return (
    <div className={style.modules}>
      {data.map((module, i) => (
        <Card
          key={module.title}
          className={cardStyles(i)}
        >
          <h2 className={style.title}>
            {i + 1}. {module.title}
          </h2>
          <div className={style['icon-container']}>
            {moduleState[i] ? (
              <CircularProgressBar
                className={style['progress-bar']}
                percentage={data[i].percentage as number}
              />
            ) : (
              <LockIcon className={style.icon} />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
