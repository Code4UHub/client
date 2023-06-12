import React, { useEffect, useState } from 'react';

import LeaderboardCard from 'components/LeaderboardCard/LeaderboardCard';

import { Leaderboard } from 'types/GroupGraph/GroupGraphType';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setLoading, removeLoading } from 'store/loading/loadingSlice';
import { RootState } from 'store/store';

import { getGraphData } from 'utils/db/db.utils';
import { arrangeLeaderboard } from 'utils/arrangeLeaderboard/arrangeLeaderboard';
import { ReactComponent as UpIcon } from './Up.svg';
import { ReactComponent as DownIcon } from './Down.svg';
import style from './Leaderboard.module.css';

export default function LeaderboardStudent() {
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [leaderboardData, setLeaderboardData] = useState<Leaderboard[]>([]);
  const [podium, setPodium] = useState<Leaderboard[]>([]);
  const [behindPodium, setBehindPodium] = useState<Leaderboard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading());
      const response = await getGraphData(
        user?.authToken as string,
        params.id as string,
        0
      );
      if (response.status === 'success') {
        setLeaderboardData(response.data as Leaderboard[]);
      }
      dispatch(removeLoading());
    };
    fetchData();
  }, [dispatch, params.id, user?.authToken]);

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

  if (noData) return <h1>No hay estudiantes aún aceptados en este grupo</h1>;
  return (
    <div className={style.container}>
      <h2 className={style.title}>Podium</h2>
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
