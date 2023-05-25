import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ModuleStudents } from 'components/ModuleStudents/ModuleStudents';
import { ModuleTeachers } from 'components/ModuleTeachers/ModuleTeachers';

import { RootState } from 'store/store';
import { setLoading, removeLoading } from 'store/loading/loadingSlice';
import { updateToast, TOAST_GENERAL_ERRORS } from 'store/toast/toastSlice';

import { UpdateModule, Module, StudentModule } from 'types/Module/Module';

import { getClassModules, updateClassModules } from 'utils/db/db.utils';

import style from './modules.module.css';

export default function Modules() {
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector((state: RootState) => state.user.currentUser);

  // Data from db. Modifiable by user
  const [moduleData, setModuleData] = useState<(Module | StudentModule)[]>([]);
  // To check if there are any changes on data
  const [initialState, setInitialState] = useState<(Module | StudentModule)[]>(
    []
  );
  const [editing, setEditing] = useState(false);
  // Just to reload information from db
  const [reload, setReload] = useState(0);

  // Get information from db
  useEffect(() => {
    const getData = async () => {
      dispatch(setLoading());
      const response = await getClassModules(
        params.id as string,
        user?.authToken as string
      );
      if (response.status === 'success') {
        setModuleData(response.data as (Module | StudentModule)[]);
        setInitialState(response.data as (Module | StudentModule)[]);
      } else {
        dispatch(updateToast(TOAST_GENERAL_ERRORS.SYSTEM));
      }
      dispatch(removeLoading());
    };
    getData();
  }, [reload, dispatch, params.id, user?.authToken]);

  const hasChanges = moduleData.reduce((result, current, index) => {
    if (current.is_active !== initialState[index].is_active) result = true;
    return result;
  }, false);

  function onCancel() {
    setEditing(false);
    setModuleData(initialState);
  }

  const onClickHandler = async () => {
    if (editing) {
      const changedModules: UpdateModule[] = moduleData.reduce(
        (accumulator: UpdateModule[], module, index) => {
          if (module.is_active !== initialState[index].is_active) {
            accumulator.push({
              is_active: module.is_active,
              module_id: module.module_id,
            });
          }
          return accumulator;
        },
        []
      );
      const response = await updateClassModules(
        changedModules,
        user?.authToken as string,
        params.id as string
      );
      dispatch(
        updateToast({
          title: `${response.status}`,
          message: `${response.data as string}`,
          type: `${response.status}`,
        })
      );
      setEditing(false);
      setReload((currentValue) => currentValue + 1);
    } else {
      setEditing(true);
    }
  };

  function changeModuleState(index: number) {
    if (editing) {
      setModuleData(
        moduleData.map((module, i) => {
          if (i === index) return { ...module, is_active: !module.is_active };
          return module;
        })
      );
    }
  }

  const cardStyles = (i: number) => {
    if (moduleData[i].is_active) return style.card;
    return `${style.card} ${style.locked}`;
  };

  if (user?.role === 'student') {
    return (
      <ModuleStudents
        data={moduleData}
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
      data={moduleData}
      changeModuleState={(i: number) => changeModuleState(i)}
      cardStyles={cardStyles}
    />
  );
}
