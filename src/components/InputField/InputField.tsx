import React from 'react';
import style from './InputField.module.css';

type Props = {
  label: string;
  type: string;
  id: string;
};

export default function InputField({ label, type, id }: Props) {
  return (
    <div className="inputHero">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} className={style.inputHero} />
    </div>
  );
}
