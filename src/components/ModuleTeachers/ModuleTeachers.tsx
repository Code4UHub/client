import React from 'react';
import { Button } from 'components/Button/Button';
import Card from 'components/Card/Card';
import { ReactComponent as LockIcon } from 'routes/modules/lock.svg';
import { ReactComponent as UnlockIcon } from 'routes/modules/unlock.svg';
import { Module } from 'types/Module/Module';

import style from './ModuleTeachers.module.css';

type Props = {
  editing: boolean;
  hasChanges: boolean;
  onClickHandler: Function;
  onCancel: Function;
  data: Module[];
  changeModuleState: Function;
  cardStyles: (i: number) => string;
};

export function ModuleTeachers({
  editing,
  hasChanges,
  onClickHandler,
  onCancel,
  data,
  changeModuleState,
  cardStyles,
}: Props) {
  return (
    <div className={style['modules-container']}>
      <div className={style['button-container']}>
        <Button
          location="modules"
          text={editing ? 'Guardar cambios' : 'Editar visibilidad'}
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
