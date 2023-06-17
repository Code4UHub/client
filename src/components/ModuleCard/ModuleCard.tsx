import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';

import { updateChallengeStatusContinue } from 'utils/db/db.utils';

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
  const user = useSelector((state: RootState) => state.user.currentUser);
  const navigateTo = useNavigate();

  const getPointsColor = (student_points: number, total_points: number) => {
    const percentage = student_points / total_points;
    if (percentage < 0.7) return style.red;
    if (percentage < 0.9) return style.blue;
    return style.green;
  };

  const moduleTotalPoints = data.challenge.reduce(
    (currentPoints, challenge) => {
      currentPoints.totalPoints += challenge.total_points;
      currentPoints.points += challenge.student_challenge[0].score;

      return currentPoints;
    },
    { totalPoints: 0, points: 0 }
  );

  const moduleProgress =
    (moduleTotalPoints.points / moduleTotalPoints.totalPoints) * 100;

  return (
    <div className={style.container}>
      <Card className={data.is_active ? style['topic-card'] : style.closed}>
        <span className={style.title}>
          {data.module_id}. {data.title}
        </span>
        {data.is_active && (
          <ProgressBar
            percentage={Number(moduleProgress.toFixed(2))}
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

        let buttonLabel = '';

        if (challenge.student_challenge[0].status === 'start') {
          buttonLabel = 'Empezar';
        } else if (challenge.student_challenge[0].status === 'continue') {
          buttonLabel = 'Continuar';
        } else {
          buttonLabel = 'Repasar';
        }

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
              text={buttonLabel}
              location="topic-card"
              onClickHandler={() => {
                if (challenge.student_challenge[0].status === 'start') {
                  updateChallengeStatusContinue(
                    user?.authToken as string,
                    challenge.challenge_id,
                    user?.id as string
                  );
                }
                navigateTo(`challenge/${challenge.challenge_id}`);
              }}
            />
          </Card>
        );
      })}
    </div>
  );
}
