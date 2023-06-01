import React, { useState } from 'react';

import { Button } from 'components/Button/Button';
import Card from 'components/Card/Card';
import ProgressBar from 'components/ProgressBar/ProgressBar';

import { StudentModule } from 'types/Module/Module';

import { ReactComponent as OpenIcon } from './openIcon.svg';
import { ReactComponent as CloseIcon } from './closeIcon.svg';
import { ReactComponent as LockIcon } from './lock.svg';

import style from './ModuleCard.module.css';

type Props = {
  data: StudentModule;
};

export default function ModuleCard({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const getPointsColor = (student_points: number, total_points: number) => {
    const percentage = student_points / total_points;
    if (percentage < 0.7) return style.red;
    if (percentage < 0.9) return style.blue;
    return style.green;
  };

  return (
    <div className={style.container}>
      <Card className={data.is_active ? style['topic-card'] : style.closed}>
        <span className={style.title}>
          {data.module_id}. {data.title}
        </span>
        {data.is_active && (
          <ProgressBar
            percentage={data.score}
            textPosition="up"
            textAdded="completado"
          />
        )}
        {!data.is_active && <LockIcon className={style.icon} />}
        {data.is_active && isOpen && (
          <CloseIcon
            className={style.icon}
            onClick={() => setIsOpen((value) => !value)}
          />
        )}
        {data.is_active && !isOpen && (
          <OpenIcon
            className={style.icon}
            onClick={() => setIsOpen((value) => !value)}
          />
        )}
      </Card>

      {data.challenge.map((challenge) => {
        const studentPoints = challenge.student_challenge[0].score;
        const { difficulty } = challenge.difficulty;
        const challengePercentage = studentPoints / challenge.total_points;
        const isChallengePassed = challengePercentage >= 0.7;
        return (
          <Card
            key={challenge.challenge_id}
            className={isOpen ? style['challenge-card'] : style['hidden-card']}
          >
            <span className={style.status}>
              {isChallengePassed ? 'Aprobado' : 'No aprobado'}
            </span>
            <span className={style.level}>Desafío {difficulty}</span>
            <div className={style.points}>
              <span
                className={getPointsColor(
                  studentPoints,
                  challenge.total_points
                )}
              >
                {studentPoints}
              </span>
              <span className={style['total-points']}>
                {' '}
                / {challenge.total_points}pts
              </span>
            </div>
            <Button
              text={isChallengePassed ? 'Repasar' : 'Aprender'}
              location="topic-card"
              onClickHandler={() => []}
            />
          </Card>
        );
      })}
    </div>
  );
}