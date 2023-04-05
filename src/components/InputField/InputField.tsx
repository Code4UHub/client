import React from 'react';
import style from './InputField.module.css';

type Props = {
  label: string;
  type: string;
  id: string;
  className: string;
  required: boolean;
  error: string;
};

export default function InputField({
  label,
  type,
  id,
  className,
  required,
  error,
}: Props) {
  return (
    <div className={`${className} ${style.inputField}`}>
      <label htmlFor={id}>{label}</label>
      <span className={style.error}>{error}</span>
      <input
        id={id}
        type={type}
        className={style.inputHero}
        required={required}
      />
    </div>
  );
}
