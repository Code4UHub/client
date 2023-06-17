import { useState, useEffect } from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { LeaderboardList } from 'types/Leaderboard/Leaderboard';
import { getLeaderboard } from 'utils/db/db.utils';
import { formatStudentLeaderboard } from 'utils/format/formatLeaderboard';

export type StudentPositionLeaderboard = {
  position: number;
  up: number;
  down: number;
  score: number;
};

export function useLeaderboardList() {
  const [leaderboardList, setLeaderboardList] = useState<LeaderboardList>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const params = useParams();

  useEffect(() => {
    const getLeaderboadList = async () => {
      setIsLoading(true);
      const leaderboard = await getLeaderboard(
        user?.authToken as string,
        params.id as string
      );
      if (
        leaderboard.status === 'success' &&
        typeof leaderboard.data !== 'string'
      ) {
        setLeaderboardList(leaderboard.data);
      }
      setIsLoading(false);
    };

    getLeaderboadList();
  }, []);

  if (user?.role === 'teacher') {
    return {
      leaderboardList,
      isLoading,
    };
  }

  return {
    leaderboardList: formatStudentLeaderboard(
      leaderboardList,
      user?.id as string
    ),
    isLoading,
  };
}
