import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { ModuleStudents } from 'components/ModuleStudents/ModuleStudents';
import { ModuleTeacherCards } from 'components/ModuleTeacherCards/ModuleTeacherCards';

import { RootState } from 'store/store';
import { setLoading, removeLoading } from 'store/loading/loadingSlice';
import { updateToast, TOAST_GENERAL_ERRORS } from 'store/toast/toastSlice';

import { Module, UpdateModule } from 'types/Module/Module';

import { getClassModules, updateClassModules } from 'utils/db/db.utils';

export default function Modules() {
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector((state: RootState) => state.user.currentUser);

  // Just to reload information from db
  const [reload, setReload] = useState(0);
  // Data from db. Modifiable by user teacher
  const [moduleData, setModuleData] = useState<Module[]>([]);
  // To check if there are any changes on data
  const [initialState, setInitialState] = useState<Module[]>([]);

  // Get information from db
  useEffect(() => {
    const getData = async () => {
      dispatch(setLoading());
      const response = await getClassModules(
        params.id as string,
        user?.authToken as string
      );
      if (response.status === 'success') {
        setModuleData(response.data as Module[]);
        setInitialState(response.data as Module[]);
      } else {
        dispatch(updateToast(TOAST_GENERAL_ERRORS.SYSTEM));
      }
      dispatch(removeLoading());
    };
    getData();
  }, [reload, dispatch, params.id, user?.authToken]);

  const onUpdateModules = async () => {
    dispatch(setLoading);
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
    dispatch(removeLoading);
    setReload((currentValue: number) => currentValue + 1);
  };

  return (
    <ModuleTeacherCards
      data={moduleData}
      onUpdate={onUpdateModules}
      initialState={initialState}
      setModuleData={setModuleData}
    />
  );
}
