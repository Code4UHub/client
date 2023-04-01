import React from 'react';
import style from './InputHero.module.css';

type Props = {
  label: string;
  type: string;
  id: string;
};

export default function InputHero({ label, type, id }: Props) {
  return (
    <div className="inputHero"> 
        <label htmlFor={id}>
            {label}
        </label>
        <input id={id} type={type} className={style.inputHero} />
    </div>
  );
}