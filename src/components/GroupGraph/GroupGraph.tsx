import React, { useEffect, useState } from 'react';

import { useIndex } from 'hooks/useIndex';
import { Button } from 'components/Button/Button';
import { SortButtons } from 'components/SortButtons/SortButtons';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import { groupOptions } from 'routes/group/groupOptions';
import { useNavigate } from 'react-router-dom';
import style from './GroupGraph.module.css';

type Props = {
  initialIndex: number;
};

type GraphData = {
  title: string;
  value: number;
};

function getDummyGraphData(): GraphData[] {
  const data = Array.from({ length: 10 }, (_, index) => {
    const title = `${index + 1}. Module de aprendizaje`;
    const value = Math.floor(Math.random() * 101);
    return { title, value };
  });

  return data;
}

export default function GroupGraph({ initialIndex }: Props) {
  const navigate = useNavigate();
  const [graphData, setGraphData] = useState<GraphData[]>([]);
  const { index, max, next, prev, setMaxIndex } = useIndex({
    initial: initialIndex,
  });

  useEffect(() => {
    setMaxIndex(groupOptions.length);
  }, []);

  useEffect(() => {
    const createdData = getDummyGraphData();
    setGraphData(createdData);
  }, [index]);

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

      <div className={style.sorters}>
        <div className={style.sort}>
          <SortButtons
            active="Up"
            group={groupOptions[index].category}
            updateSortRule={() => {}}
          />
          <span>{groupOptions[index].category}</span>
        </div>
        <div className={style.sort}>
          <SortButtons
            active="none"
            group={groupOptions[index].evaluate}
            updateSortRule={() => {}}
          />
          <span>{groupOptions[index].evaluate}</span>
        </div>
      </div>

      <div className={style.graphs}>
        {graphData.map((d) => (
          <>
            <span
              key={`${index}${d.title}${d.value}span`}
              className={style['graph-title']}
            >
              {d.title}
            </span>
            <div
              key={`${index}${d.title}${d.value}cont`}
              className={style['bar-graph']}
            >
              <ProgressBar
                percentage={d.value}
                textPosition="in"
                key={`${index}${d.title}${d.value}graph`}
              />
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
