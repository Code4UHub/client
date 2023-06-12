import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useParams } from 'react-router-dom';

import { getClassHomeworkList, getServerTime } from 'utils/db/db.utils';
import { groupHomeworkByDate } from 'utils/sortHomework/sortHomework';

import { Homework } from 'types/Homework/Homework';

export function useHomeworkList(withEndDate: boolean) {
  const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const user = useSelector((state: RootState) => state.user.currentUser);
  const urlParams = useParams();

  useEffect(() => {
    const getHomeworkList = async () => {
      setIsFetching(true);
      try {
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
