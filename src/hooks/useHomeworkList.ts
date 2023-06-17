import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useParams } from 'react-router-dom';

import {
  getClassHomeworkList,
  getServerTime,
  getStudentClassHomeworks,
} from 'utils/db/db.utils';
import { groupHomeworkByDate } from 'utils/sortHomework/sortHomework';

import { Homework, StudentClassHomework } from 'types/Homework/Homework';

export function useHomeworkList(withEndDate: boolean) {
  const [homeworkList, setHomeworkList] = useState<
    (Homework | StudentClassHomework)[]
  >([]);
  const [isFetching, setIsFetching] = useState(false);

  const user = useSelector((state: RootState) => state.user.currentUser);
  const urlParams = useParams();

  useEffect(() => {
    const getHomeworkList = async () => {
      setIsFetching(true);
      try {
        if (user?.role === 'student') {
          const homeworks = await getStudentClassHomeworks(
            user.authToken,
            urlParams?.id as string,
            user.id
          );

          if (
            homeworks.status === 'success' &&
            typeof homeworks.data !== 'string'
          ) {
            setHomeworkList(homeworks.data);
          }
        } else {
          const serverTimePromise = await getServerTime(
            user?.authToken as string
          );

          if (
            serverTimePromise.status === 'success' &&
            typeof serverTimePromise.data !== 'string'
          ) {
            const startDate = new Date(serverTimePromise.data.currentTime);
            const endDate = withEndDate
              ? new Date(serverTimePromise.data.currentTime)
              : undefined;
            if (endDate) {
              endDate.setDate(endDate.getDate() + 6);
            }

            const homeworkListPromise = await getClassHomeworkList(
              user?.authToken as string,
              urlParams?.id as string,
              startDate,
              endDate
            );

            if (
              homeworkListPromise.status === 'success' &&
              typeof homeworkListPromise.data !== 'string'
            ) {
              setHomeworkList(homeworkListPromise.data);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    };

    getHomeworkList();
  }, []);

  return {
    homeworkList: groupHomeworkByDate(homeworkList),
    isLoading: isFetching,
  };
}
