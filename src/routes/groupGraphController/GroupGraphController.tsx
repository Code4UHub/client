import React, { useEffect, useState } from 'react';

import { Button } from 'components/Button/Button';
import GroupGraph from 'components/GroupGraph/GroupGraph';
import LeaderboardTeacher from 'components/LeaderboardTeacher/LeaderboardTeacher';

import { groupOptions } from 'routes/group/groupOptions';

import { useIndex } from 'hooks/useIndex';
import { useNavigate, useParams } from 'react-router-dom';

import { GroupGraphType } from 'types/GroupGraph/GroupGraphType';
import { Leaderboard } from 'types/Leaderboard/Leaderboard';

import { leaderboardData } from './leaderboardDummyData';
import style from './GroupGraphController.module.css';

function getDummyGraphData(
  isLeaderboard: boolean
): (GroupGraphType | Leaderboard)[] {
  if (isLeaderboard) {
    return leaderboardData;
  }
  const data = Array.from({ length: 10 }, () => {
    const title = 'Modulo de aprendizaje';
    const value = Math.floor(Math.random() * 101);
    const id = Math.floor(Math.random() * 101);
    return { title, value, id };
  });
  return data;
}

export default function GroupGraphController() {
  const params = useParams();
  const navigate = useNavigate();

  const [graphData, setGraphData] = useState<(GroupGraphType | Leaderboard)[]>(
    []
  );
  const { index, max, next, prev, setMaxIndex } = useIndex({
    initial: parseInt(params.id_graph as string, 10) || 0,
  });
  const isLeaderboard = groupOptions[index].category === 'Leaderboard';

  useEffect(() => {
    setMaxIndex(groupOptions.length);
  }, [setMaxIndex]);

  useEffect(() => {
    const createdData = getDummyGraphData(isLeaderboard);
    setGraphData(createdData);
  }, [index, isLeaderboard]);

  const onClickHandler = (action: string) => {
    if (action === 'all') {
      navigate('../group');
    }
    if (action === 'prev') {
      prev();
    }
    if (action === 'next') {
      next();
    }
  };

  return (
    <div className={style.container}>
      <div className={style.controllers}>
        <Button
          location="groupChange"
          text="<"
          onClickHandler={() => onClickHandler('prev')}
          type="button"
          isDisable={index === 0}
        />
        <Button
          location="groupAll"
          text="Todas las opciones"
          onClickHandler={() => onClickHandler('all')}
          type="button"
          isDisable={false}
        />
        <Button
          location="groupChange"
          text=">"
          onClickHandler={() => onClickHandler('next')}
          type="button"
          isDisable={index === max - 1}
        />
      </div>

      <h2 className={style.title}>{groupOptions[index].title}</h2>
      <p className={style.description}>{groupOptions[index].information}</p>

      {isLeaderboard ? (
        <LeaderboardTeacher data={graphData as Leaderboard[]} />
      ) : (
        <GroupGraph
          key={`${groupOptions[index].category}${groupOptions[index].evaluate}`}
          graphData={graphData as GroupGraphType[]}
          category={groupOptions[index].category}
          evaluate={groupOptions[index].evaluate}
        />
      )}
    </div>
  );
}
