import React from 'react';

import style from './SortButtons.module.css';

type Props = {
  active: 'Up' | 'Down' | 'none';
  group: string;
  updateSortRule: Function;
};

export function SortButtons({ active, group, updateSortRule }: Props) {
  return (
    <div className={style['sort-buttons']}>
      <button
        className={`
                ${style.up} 
                ${active === 'Up' ? style['up-active'] : ''}
            `}
        onClick={() => updateSortRule({ element: group, value: 'Up' })}
        type="button"
      >
        Ordenar ascendientemente
      </button>
      <button
        className={`
                ${style.down} 
                ${active === 'Down' ? style['down-active'] : ''}
            `}
        onClick={() => updateSortRule({ element: group, value: 'Down' })}
        type="button"
      >
        Ordenar descendientemente
      </button>
    </div>
  );
}
