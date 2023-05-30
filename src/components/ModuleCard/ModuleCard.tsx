import React, { useState } from 'react';

import { Button } from 'components/Button/Button';
import Card from 'components/Card/Card';
import { Topic } from 'types/Topic/Topic';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import { ReactComponent as OpenIcon } from './openIcon.svg';
import { ReactComponent as CloseIcon } from './closeIcon.svg';

import style from './ModuleCard.module.css';

type Props = {
  data: Topic;
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
      <Card className={style['topic-card']}>
        <span className={style.title}>
          {data.topic_id}. {data.title}
        </span>
        <ProgressBar
          percentage={data.percentage}
          textPosition="up"
          textAdded="completado"
        />
        {isOpen ? (
          <CloseIcon
            className={style.icon}
            onClick={() => setIsOpen((value) => !value)}
          />
        ) : (
          <OpenIcon
            className={style.icon}
            onClick={() => setIsOpen((value) => !value)}
          />
        )}
      </Card>

      {data.challenges.map((challenge) => {
        const challengePercentage =
          challenge.student_points / challenge.total_points;
        const isChallengePassed = challengePercentage >= 0.7;
        return (
          <Card
            key={challenge.challenge_id}
            className={isOpen ? style['challenge-card'] : style['hidden-card']}
          >
            <span className={style.status}>
              {isChallengePassed ? 'Aprobado' : 'No aprobado'}
            </span>
            <span className={style.level}>Desafío {challenge.level}</span>
            <div className={style.points}>
              <span
                className={getPointsColor(
                  challenge.student_points,
                  challenge.total_points
                )}
              >
                {challenge.student_points}
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
