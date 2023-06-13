import React, { useState, useEffect } from 'react';

import ModuleCard from 'components/ModuleCard/ModuleCard';
import CardSkeleton from 'components/CardSkeleton/CardSkeleton';
import { BarLegend } from 'components/ProgressBar/ProgressBar';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setLoading, removeLoading } from 'store/loading/loadingSlice';
import { RootState } from 'store/store';
import { updateToast } from 'store/toast/toastSlice';

import { StudentModule } from 'types/Module/Module';

import { getStudentModuleProgress } from 'utils/db/db.utils';

import style from './ModuleStudents.module.css';

export default function ModuleStudents() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const isLoading = useSelector((state: RootState) => state.loading.loadingVal);
  const params = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState<StudentModule[]>([]);

  // Get information from database
  useEffect(() => {
    const getData = async () => {
      dispatch(setLoading());
      const response = await getStudentModuleProgress(
        params.id as string,
        user?.authToken as string,
        user?.id as string
      );
      if (response.status === 'success') {
        setData(response.data as StudentModule[]);
      } else {
        dispatch(
          updateToast({
            title: response.status,
            message: response.data as string,
            type: 'error',
          })
        );
      }
      dispatch(removeLoading());
    };
    getData();
  }, [dispatch, params.id, user?.id, user?.authToken]);

  // Show skeleton if information is loading
  if (isLoading)
    return (
      <div className={style.loading}>
        <CardSkeleton items={10} />
      </div>
    );

  // Display real information
  return (
    <div className={style.container}>
      <BarLegend />
      {data.map((module) => (
        <ModuleCard
          key={module.module_id}
          data={module}
        />
      ))}
    </div>
  );
}
