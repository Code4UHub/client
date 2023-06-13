import React, { useEffect, useState } from 'react';

import LeaderboardCard from 'components/LeaderboardCard/LeaderboardCard';
import NoResultsMessage from 'components/NoResultsMessage/NoResultsMessage';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { Leaderboard } from 'types/GroupGraph/GroupGraphType';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'store/store';

import { getGraphData } from 'utils/db/db.utils';
import { arrangeLeaderboard } from 'utils/arrangeLeaderboard/arrangeLeaderboard';
import { ReactComponent as UpIcon } from './Up.svg';
import { ReactComponent as DownIcon } from './Down.svg';
import style from './Leaderboard.module.css';

export default function LeaderboardStudent() {
  const params = useParams();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [leaderboardData, setLeaderboardData] = useState<Leaderboard[]>([]);
  const [podium, setPodium] = useState<Leaderboard[]>([]);
  const [behindPodium, setBehindPodium] = useState<Leaderboard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getGraphData(
        user?.authToken as string,
        params.id as string,
        0
      );
      if (response.status === 'success') {
        setLeaderboardData(response.data as Leaderboard[]);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [params.id, user?.authToken]);

  useEffect(() => {
    // To get who is in the podium, and how people relate to your current position
    const filterLeaderboard = arrangeLeaderboard(
      leaderboardData as Leaderboard[],
      user?.id as string
    );
    setPodium(filterLeaderboard.podium);
    setBehindPodium(filterLeaderboard.position);
  }, [leaderboardData, user?.id]);

  const isInPodium = behindPodium.length === 0 && podium.length !== 0;
  const noData = behindPodium.length === 0 && podium.length === 0;

  if (isLoading) return <LoadingSpinner />;

  if (noData)
    return <NoResultsMessage message="No hay estudiantes en la clase 🙁" />;
  return (
    <div className={style.container}>
      <h2 className={style.title}>Podio</h2>
      {podium.map(({ student, score, position, name }, index) => {
        if (!isInPodium)
          return (
            <LeaderboardCard
              key={student}
              student_id={student}
              points={score}
              position={position}
              name={name}
              is_active={student === user?.id}
            />
          );
        if (student === user?.id)
          return (
            <React.Fragment key={student}>
              {index !== 0 && (
                <div className={style.difference}>
                  <UpIcon className={style.icon} />
                  <span className={style.up}>
                    {podium[index - 1].score - score}pts
                  </span>
                </div>
              )}
              <LeaderboardCard
                student_id={student}
                points={score}
                position={position}
                name={name}
                is_active={student === user?.id}
              />
              {index !== podium.length - 1 && (
                <div className={style.difference}>
                  <DownIcon className={style.icon} />
                  <span className={style.down}>
                    {podium[index + 1].score - score}pts
                  </span>
                </div>
              )}
            </React.Fragment>
          );
        return (
          <LeaderboardCard
            key={student}
            student_id={student}
            points={score}
            position={position}
            name={name}
            is_active={student === user?.id}
          />
        );
      })}
      {!isInPodium && <h2 className={style.title}>Tu posición</h2>}
      {!isInPodium &&
        behindPodium.map(({ student, score, position, name }, index) => {
          if (student !== user?.id)
            return (
              <LeaderboardCard
                key={student}
                student_id={student}
                points={score}
                position={position}
                name={name}
                is_active={student === user?.id}
              />
            );
          return (
            <React.Fragment key={student}>
              {index !== 0 && (
                <div className={style.difference}>
                  <UpIcon className={style.icon} />
                  <span className={style.up}>
                    {podium[index - 1].score - score}pts
                  </span>
                </div>
              )}
              <LeaderboardCard
                student_id={student}
                points={score}
                position={position}
                name={name}
                is_active={student === user?.id}
              />
              {index !== behindPodium.length - 1 && (
                <div className={style.difference}>
                  <DownIcon className={style.icon} />
                  <span className={style.down}>
                    {podium[index + 1].score - score}pts
                  </span>
                </div>
              )}
            </React.Fragment>
          );
        })}
    </div>
  );
}
