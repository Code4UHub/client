import { useState, useEffect } from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import {
  StudentAllHomeworks,
  TeacherAllHomeworks,
} from 'types/Homework/Homework';
import {
  getAllStudentHomeworks,
  getAllTeacherHomeworks,
} from 'utils/db/db.utils';
import { groupHomeworkByDate } from 'utils/sortHomework/sortHomework';

export function useAllHomeworkList() {
  const [homeworkList, setHomeworkList] = useState<
    (StudentAllHomeworks | TeacherAllHomeworks)[]
  >([]);
  const [isFetching, setIsFetching] = useState(false);

  const user = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    const getHomeworkList = async () => {
      setIsFetching(true);
      try {
        const allHomeworkList =
          user?.role === 'teacher'
            ? await getAllTeacherHomeworks(
                user?.authToken as string,
                user?.id as string
              )
            : await getAllStudentHomeworks(
                user?.authToken as string,
                user?.id as string
              );

        if (
          allHomeworkList.status === 'success' &&
          typeof allHomeworkList.data !== 'string'
        ) {
          setHomeworkList(allHomeworkList.data);
        }
        setIsFetching(false);
      } catch (error) {
        setIsFetching(false);
      }
    };

    getHomeworkList();
  }, []);

  return {
    homeworkList: groupHomeworkByDate(homeworkList),
    isLoading: isFetching,
  };
}
