import React, { useEffect } from 'react';

import { useIndex } from 'hooks/useIndex';
import { Button } from 'components/Button/Button';
import { groupOptions } from 'routes/group/groupOptions';
import { useNavigate } from 'react-router-dom';
import style from './GroupGraph.module.css';

type Props = {
  initialIndex: number;
};

export default function GroupGraph({ initialIndex }: Props) {
  const navigate = useNavigate();
  const { index, max, next, prev, setMaxIndex } = useIndex({
    initial: initialIndex,
  });

  useEffect(() => {
    setMaxIndex(groupOptions.length);
  }, []);

  const onClickHandler = (action: string) => {
    if (action === 'Todas las opciones') {
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
          location="groupChange"
          text="<"
          onClickHandler={() => onClickHandler('prev')}
          type="button"
          isDisable={index === 0}
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
