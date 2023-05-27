import React, { useEffect } from 'react';

import { Button } from 'components/Button/Button';

import { useNavigate } from 'react-router-dom';
import { useIndex } from 'hooks/useIndex';

import { data } from './topicsDummyData';
import style from './topics.module.css';

type Props = {
  initialIndex: number;
};

export default function Topics({ initialIndex }: Props) {
  const { index, max, next, prev, setMaxIndex } = useIndex({
    initial: initialIndex,
  });
  const navigate = useNavigate();

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
    setMaxIndex(data.length);
  }, [data]);

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
    </div>
  );
}
