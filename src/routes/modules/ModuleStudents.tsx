import React, { useState, useEffect } from 'react';

import ModuleCard from 'components/ModuleCard/ModuleCard';
import CardSkeleton from 'components/CardSkeleton/CardSkeleton';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setLoading, removeLoading } from 'store/loading/loadingSlice';
import { RootState } from 'store/store';
import { updateToast } from 'store/toast/toastSlice';

import { StudentModule } from 'types/Module/Module';

import { getStudentModuleProgress } from 'utils/db/db.utils';

// import { data } from './moduledummy';

import style from './ModuleStudents.module.css';

export default function ModuleStudents() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const isLoading = useSelector((state: RootState) => state.loading.loadingVal);
  const params = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState<StudentModule[]>([]);

  useEffect(() => {
    const getData = async () => {
      dispatch(setLoading);
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
      dispatch(removeLoading);
    };
    getData();
  }, []);

  if (isLoading)
    return (
      <div className={style.container}>
        <CardSkeleton items={10} />
      </div>
    );

  return (
    <div className={style.container}>
      {data.map((module) => (
        <ModuleCard
          key={module.module_id}
          data={module}
        />
      ))}
    </div>
  );
}
