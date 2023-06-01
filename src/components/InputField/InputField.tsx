import React, { forwardRef } from 'react';
import { correctState } from 'utils/inputRules/generalRules';
import style from './InputField.module.css';

type Props = {
  label: string;
  type: string;
  id: string;
  className: string;
  required: boolean;
  error: string;
  value: string;
  handleBlur: (id: string, value: string) => void;
  handleChange: (id: string, value: string) => void;
  handleFocus?: () => void;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  defaultValue?: string;
};

function decideSpanClass(error: string) {
  if (error) {
    return error === correctState ? style.correct : style.error;
  }

  return undefined;
}

export const InputField = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <div className={`${props.className} ${style.inputField}`}>
    <div className={style['label-container']}>
      <label htmlFor={props.id}>{props.label}</label>
      <span className={decideSpanClass(props.error)}>{props.error}</span>
    </div>
    <input
      id={props.id}
      ref={ref}
      type={props.type}
      className={`${style.inputHero} ${props.readOnly ? style.readOnly : ''}`}
      required={props.required}
      onBlur={() => props.handleBlur(props.id, props.value)}
      onChange={(e) => props.handleChange(props.id, e.target.value)}
      onFocus={props.handleFocus}
      onKeyDown={props.handleKeyDown}
      readOnly={props.readOnly}
      value={props.defaultValue ? props.defaultValue : undefined}
      min={props.type === 'number' ? 0 : undefined}
      max={props.type === 'number' ? 5 : undefined}
    />
  </div>
));

InputField.defaultProps = {
  handleFocus: () => {},
  handleKeyDown: () => {},
  readOnly: false,
  defaultValue: '',
};
