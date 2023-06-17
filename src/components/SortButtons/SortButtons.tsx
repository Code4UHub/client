import React from 'react';

import style from './SortButtons.module.css';

type Props = {
  active: 'Up' | 'Down' | 'none';
  parameter: string;
  updateSortRule: Function;
};

export function SortButtons({ active, parameter, updateSortRule }: Props) {
  return (
    <div className={style.container}>
      <div className={style['sort-buttons']}>
        <button
          className={`
                  ${style.up} 
                  ${active === 'Up' ? style['up-active'] : ''}
              `}
          onClick={() => updateSortRule(parameter, 'Up')}
          type="button"
        >
          Ordenar ascendientemente
        </button>
        <button
          className={`
                  ${style.down} 
                  ${active === 'Down' ? style['down-active'] : ''}
              `}
          onClick={() => updateSortRule(parameter, 'Down')}
          type="button"
        >
          Ordenar descendientemente
        </button>
      </div>
      <span className={style['header-name']}>{parameter}</span>
    </div>
  );
}
