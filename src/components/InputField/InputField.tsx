import React from 'react';
import style from './InputField.module.css';

type Props = {
  label: string;
  type: string;
  id: string;
  className: string;
};

export default function InputField({ label, type, id, className }: Props) {
  return (
    <div className={`${className} ${style.inputField}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} className={style.inputHero} />
    </div>
  );
}
