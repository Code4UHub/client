/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getIncomingChallenge } from 'utils/db/db.utils';
import { Challenge } from 'types/Challenge/Challenge';
import GoToActivityCard from 'components/GoToActivityCard/GoToActivityCard';

type Props = {
  className?: string;
};

// TODO: Set Correct Activity Data Type
export default function ContinueActivityCard({ className }: Props) {
  const params = useParams();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [activity, setActivity] = useState<Challenge | {}>({});

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getActivity = async () => {
      setIsFetching(true);
      try {
        const activityData = await getIncomingChallenge(
          user?.authToken as string,
          params?.id as string,
          user?.id as string
        );

        if (activityData.status === 'success') {
          setActivity(activityData.data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    };

    getActivity();
  }, []);

  return (
    <GoToActivityCard
      className={className}
      activity={activity}
      isLoading={isFetching}
    />
  );
}

ContinueActivityCard.defaultProps = {
  className: '',
};
