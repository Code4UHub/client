import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { ModuleStudents } from 'components/ModuleStudents/ModuleStudents';
import { ModuleTeachers } from 'components/ModuleTeachers/ModuleTeachers';
import { data } from './modulesData';

import style from './modules.module.css';

export default function Modules() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [moduleState, setModuleState] = useState<boolean[]>([]);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    const initialState = data.map((module) => module.isOpen);
    setModuleState(initialState);
  }, []);

  const hasChanges = moduleState.reduce((result, current, index) => {
    if (current !== data[index].isOpen) result = true;
    return result;
  }, false);

  function onCancel() {
    setEditing(false);
    const initialState = data.map((module) => module.isOpen);
    setModuleState(initialState);
  }

  function onClickHandler() {
    if (editing) {
      console.log('Guardado');
    } else {
      setEditing(true);
    }
  }

  function changeModuleState(index: number) {
    if (editing) {
      setModuleState((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    }
  }

  const cardStyles = (i: number) => {
    if (moduleState[i]) return style.card;
    return `${style.card} ${style.locked}`;
  };

  if (user?.role === 'student') {
    return (
      <ModuleStudents
        data={data}
        moduleState={moduleState}
        cardStyles={cardStyles}
      />
    );
  }

  return (
    <ModuleTeachers
      editing={editing}
      hasChanges={hasChanges}
      onClickHandler={() => onClickHandler()}
      onCancel={() => onCancel()}
      data={data}
      moduleState={moduleState}
      changeModuleState={(i: number) => changeModuleState(i)}
      cardStyles={cardStyles}
    />
  );
}
