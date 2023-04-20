import React from "react"

import style from './RadioInput.module.css';

type Props = {
  index: number;
  text: string;
  isChecked: boolean;
  onClick: (index: number) => void;
}

export default function RadioInput({onClick, index, text, isChecked}: Props) {
  return (
    <div className={style.radioInput}>
      <input type="radio" id={index.toString()} name="drone" value={text} checked={isChecked} onChange={(e) => onClick(Number(e.target.id))}/>
      <label htmlFor={index.toString()}>{text}</label>
    </div>
  )
}