import React, { useState } from 'react';
import { Button } from 'components/Button/Button';
import Card from 'components/Card/Card';
import CardSkeleton from 'components/CardSkeleton/CardSkeleton';

import { ReactComponent as LockIcon } from 'routes/class/modules/lock.svg';
import { ReactComponent as UnlockIcon } from 'routes/class/modules/unlock.svg';

import { Module } from 'types/Module/Module';

import { useSelector } from 'react-redux';

import { RootState } from 'store/store';

import style from './ModuleTeacherCards.module.css';

type Props = {
  data: Module[];
  initialState: Module[];
  setModuleData: Function;
  onUpdate: Function;
};

export function ModuleTeacherCards({
  data,
  initialState,
  setModuleData,
  onUpdate,
}: Props) {
  const isLoading = useSelector((state: RootState) => state.loading.loadingVal);

  const [editing, setEditing] = useState(false);

  const hasChanges = data.reduce((result, current, index) => {
    if (current.is_active !== initialState[index].is_active) result = true;
    return result;
  }, false);

  function onCancel() {
    setEditing(false);
    setModuleData(initialState);
  }

  const onClickHandler = async () => {
    if (editing) {
      onUpdate();
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  function changeModuleState(index: number) {
    if (editing) {
      setModuleData(
        data.map((module, i) => {
          if (i === index) return { ...module, is_active: !module.is_active };
          return module;
        })
      );
    }
  }

  const cardStyles = (i: number) => {
    if (data[i].is_active) return style.card;
    return `${style.card} ${style.locked}`;
  };

  if (isLoading) {
    return (
      <div className={style['modules-container']}>
        <div className={style.modules}>
          <CardSkeleton items={8} />
        </div>
      </div>
    );
  }

  return (
    <div className={style['modules-container']}>
      <div className={style.controllers}>
        <div className={style['button-container']}>
          <Button
            location="modules"
            text={editing ? 'Guardar' : 'Habilitar / Bloquear'}
            isDisable={editing ? !hasChanges : false}
            onClickHandler={() => onClickHandler()}
          />
          {editing && (
            <Button
              location="modules"
              className={style.cancel}
              text="Cancelar"
              isDisable={false}
              onClickHandler={() => onCancel()}
            />
          )}
        </div>
        {editing && (
          <span className={style.instructions}>
            Da click en el candado para hacer cambios
          </span>
        )}
      </div>
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
              {data[i].is_active ? (
                <UnlockIcon
                  className={editing ? style['clickable-icon'] : style.icon}
                  onClick={() => changeModuleState(i)}
                />
              ) : (
                <LockIcon
                  className={editing ? style['clickable-icon'] : style.icon}
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
