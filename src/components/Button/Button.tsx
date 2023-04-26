import React from 'react';
import style from './Button.module.css';

type Props = {
  className?: string;
  location: string;
  text: string;
  onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  isDisable?: boolean;
  onKeyDownHandler?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => (
    <button
      className={`${props.className} ${style[props.location]}`}
      onClick={props.onClickHandler}
      disabled={props.isDisable}
      // eslint-disable-next-line react/button-has-type
      type={props.type}
      ref={ref}
      onKeyDown={props.onKeyDownHandler}
    >
      {props.text}
    </button>
  )
);

Button.defaultProps = {
  className: '',
  type: 'button',
  isDisable: false,
  onKeyDownHandler: () => {},
};
