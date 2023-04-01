import React from 'react';
import style from './Button.module.css';

type Props = {
  location: string;
  text: string;
  onClickHandler: () => void;
};

export default function Button({ location, text, onClickHandler }: Props) {
  return (
    <button className={style[location]} type="button" onClick={onClickHandler}>
      {text}
    </button>
  );
}
