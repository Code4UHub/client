import React from 'react';
import style from './ButtonHero.module.css';

type Props = {
  location: string;
  text: string;
  onClickHandler: () => void;
};

export function ButtonHero({ location, text, onClickHandler }: Props) {
  return (
    <button className={style[location]} type="button" onClick={onClickHandler}>
      {text}
    </button>
  );
}
