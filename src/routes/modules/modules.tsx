import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Button } from 'components/Button/Button';
import Card from 'components/Card/Card';
import { CircularProgressBar } from 'components/CircularProgressBar/CircularProgressBar';
import { ReactComponent as UnlockIcon } from './unlock.svg';
import { ReactComponent as LockIcon } from './lock.svg';

import style from './modules.module.css';

const data = [
  {
    title: 'Introducción a la programación',
    isOpen: true,
    percentage: 90,
  },
  {
    title: 'Problemas con cálculos',
    isOpen: true,
    percentage: 59,
  },
  {
    title: 'Programación modular',
    isOpen: true,
    percentage: 25,
  },
  {
    title: 'Estructuras de decisión',
    isOpen: false,
  },
  {
    title: 'Estructuras de repetición',
    isOpen: false,
  },
  {
    title: 'Datos estructurados',
    isOpen: false,
  },
  {
    title: 'Archivos',
    isOpen: false,
  },
];

export default function Modules() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [moduleState, setModuleState] = useState<boolean[]>([]);
  useEffect(() => {
    const initialState = data.map((module) => module.isOpen);
    setModuleState(initialState);
  }, []);

  const hasChanges = moduleState.reduce((result, current, index) => {
    if (current !== data[index].isOpen) result = true;
    return result;
  }, false);

  function changeModuleState(index: number) {
    setModuleState((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  }

  const cardStyles = (i: number) => {
    if (moduleState[i]) return style.card;
    return `${style.card} ${style.locked}`;
  };

  if (user?.role === 'student') {
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
  return (
    <div className={style['modules-container']}>
      <Button
        location="modules"
        text="Guardar cambios"
        isDisable={!hasChanges}
        onClickHandler={() => []}
      />
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
                <UnlockIcon
                  className={style.icon}
                  onClick={() => changeModuleState(i)}
                />
              ) : (
                <LockIcon
                  className={style.icon}
                  onClick={() => changeModuleState(i)}
                />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
