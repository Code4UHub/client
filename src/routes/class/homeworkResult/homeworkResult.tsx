import React, { useState, useEffect } from 'react';

import TableSkeleton from 'components/TableSkeleton/TableSkeleton';

import { RootState } from 'store/store';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setLoading, removeLoading } from 'store/loading/loadingSlice';

import { HomeworkResult } from 'types/HomeworkResult/HomeworkResult';

import { getHomeworkResults } from 'utils/db/db.utils';

import style from './homeworkResult.module.css';

const HEADERS = {
  student_id: 'Matrícula',
  student_name: 'Nombre',
  score: 'Calificación',
  out_of_focus_time: 'Tiempo fuera',
};

export default function HomeworkGrades() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const params = useParams();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<HomeworkResult[]>([]);

  useEffect(() => {
    const getResults = async () => {
      setIsLoading(true);
      dispatch(setLoading());
      const response = await getHomeworkResults(
        user?.authToken as string,
        parseInt(params.assignmentId as string, 10)
      );
      if (response.status === 'success') {
        setData(response.data as HomeworkResult[]);
      }
      dispatch(removeLoading());
      setIsLoading(false);
    };
    getResults();
  }, []);

  const getScoreColor = (score: number) => {
    if (score < 70) return style.red;
    if (score < 90) return style.blue;
    return style.green;
  };

  if (isLoading) {
    return (
      <TableSkeleton
        headers={Object.keys(HEADERS).length}
        skeletons={10}
      />
    );
  }
  if (data.length === 0) {
    return (
      <div className={style.container}>
        <h2 className={style.title}>Parece que aún no tienes estudiantes</h2>
      </div>
    );
  }
  return (
    <div className={style.container}>
      <h2 className={style.title}>Resultados de la Tarea</h2>

      <p className={style.explanation}>
        Tiempo fuera se refiere al tiempo que el estudiante estuvo fuera de la
        actividad o tarea mientras tenía la pestaña de la actividad o tarea
        abierta
      </p>

      <div className={style['table-container']}>
        <table className={style.results}>
          <thead>
            <tr className={style['headers-row']}>
              {Object.values(HEADERS).map((header) => (
                <th
                  key={header}
                  className={style.headers}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={style.tbody}>
            {data.map(
              ({ student_id, student_name, score, out_of_focus_time }) => (
                <tr
                  className={style['table-rows']}
                  key={student_id}
                >
                  <td className={style.info}>{student_id}</td>
                  <td className={style.info}>{student_name}</td>
                  <td className={getScoreColor(score)}>{score}%</td>
                  <td className={style.info}>{out_of_focus_time || 0}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
