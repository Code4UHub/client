import React from 'react';

import { Button } from 'components/Button/Button';
import GroupGraph from 'components/GroupGraph/GroupGraph';
import LeaderboardTeacher from 'components/LeaderboardTeacher/LeaderboardTeacher';

import { groupOptions } from 'routes/class/group/groupOptions';

import { useNavigate, useLoaderData, useParams } from 'react-router-dom';

import { GroupGraphType, Leaderboard } from 'types/GroupGraph/GroupGraphType';

import style from './GroupGraphController.module.css';

export default function GroupGraphController() {
  const graphData = useLoaderData() as (GroupGraphType | Leaderboard)[];
  const navigate = useNavigate();
  const params = useParams();
  const graphId = parseInt(params.graph_id ?? '0', 10);
  const isLeaderboard = groupOptions[graphId].category === 'Leaderboard';

  const onClickHandler = (action: string) => {
    if (action === 'all') {
      navigate('../', { relative: 'path' });
    }
    if (action === 'prev' && graphId > 0) {
      navigate(`../${graphId - 1}`, { relative: 'path' });
    }
    if (action === 'next' && graphId < groupOptions.length) {
      navigate(`../${graphId + 1}`, { relative: 'path' });
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
          isDisable={graphId === 0}
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
          isDisable={graphId === groupOptions.length - 1}
        />
      </div>

      <h2 className={style.title}>{groupOptions[graphId].title}</h2>
      <p className={style.description}>{groupOptions[graphId].information}</p>

      {isLeaderboard ? (
        <LeaderboardTeacher data={graphData as Leaderboard[]} />
      ) : (
        <GroupGraph
          key={`${groupOptions[graphId].category}${groupOptions[graphId].evaluate}`}
          graphData={graphData as GroupGraphType[]}
          category={groupOptions[graphId].category}
          evaluate={groupOptions[graphId].evaluate}
        />
      )}
    </div>
  );
}
