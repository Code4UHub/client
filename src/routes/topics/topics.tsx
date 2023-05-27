import React, { useEffect } from 'react';

import { Button } from 'components/Button/Button';
import ModuleTopics from 'components/ModuleTopics/ModuleTopics';

import { useNavigate, useLocation } from 'react-router-dom';
import { useIndex } from 'hooks/useIndex';

import { data } from './topicsDummyData';
import style from './topics.module.css';

export default function Topics() {
  const navigate = useNavigate();
  // Retrieve initialIndex and module data
  const location = useLocation();
  const titles = location.state.titles || [];
  const initialIndex = location.state.initialIndex || 0;

  const { index, max, next, prev, setMaxIndex } = useIndex({
    initial: initialIndex,
  });

  const onClickHandler = (action: string) => {
    if (action === 'all') {
      navigate('../modules');
    }
    if (action === 'prev') {
      prev();
    }
    if (action === 'next') {
      next();
    }
  };

  useEffect(() => {
    setMaxIndex(titles.length);
  }, [titles, setMaxIndex]);

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
          text="Todos los módulos"
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
      <ModuleTopics
        module_title={titles[index]}
        topics={data}
      />
    </div>
  );
}
