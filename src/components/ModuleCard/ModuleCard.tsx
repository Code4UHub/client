import React, { useState } from 'react';

import { Button } from 'components/Button/Button';
import Card from 'components/Card/Card';
import { StudentModule } from 'types/Module/Module';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import { ReactComponent as OpenIcon } from './openIcon.svg';
import { ReactComponent as CloseIcon } from './closeIcon.svg';

import style from './ModuleCard.module.css';

type Props = {
  data: StudentModule;
};

function getDifficulty(id: number) {
  switch (id) {
    case 1:
      return 'Fácil';
    case 2:
      return 'Medio';
    case 3:
      return 'Difícil';
    default:
      return 'Difícil';
  }
}

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
          {data.module_id}. {data.title}
        </span>
        <ProgressBar
          percentage={data.score}
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

      {data.challenge.map((challenge) => {
        const studentPoints = challenge.student_challenge[0].score;
        const difficulty = getDifficulty(challenge.difficulty_id);
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
