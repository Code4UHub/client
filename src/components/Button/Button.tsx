import React from 'react';
import style from './Button.module.css';

type Props = {
  location: string;
  text: string;
  onClickHandler: () => void;
  type?: string;
};

export default function Button({
  location,
  text,
  onClickHandler,
  type,
}: Props) {
  const isSubmit: boolean = type === 'submit';
  return (
    <button
      className={style[location]}
      onClick={onClickHandler}
      type={isSubmit ? 'submit' : 'button'}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
};
