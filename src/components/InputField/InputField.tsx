import React from "react";
import { correctState } from "utils/inputRules/generalRules";
import style from "./InputField.module.css";

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
};

function decideSpanClass(error: string) {
  if (error) {
    return error === correctState ? style.correct : style.error;
  }

  return undefined;
}

export default function InputField({
  label,
  type,
  id,
  className,
  required,
  error,
  value,
  handleChange,
  handleBlur,
}: Props) {
  return (
    <div className={`${className} ${style.inputField}`}>
      <div className={style["label-container"]}>
        <label htmlFor={id}>{label}</label>
        <span className={decideSpanClass(error)}>{error}</span>
      </div>
      <input
        id={id}
        type={type}
        className={style.inputHero}
        required={required}
        onBlur={() => handleBlur(id, value)}
        onChange={(e) => handleChange(id, e.target.value)}
      />
    </div>
  );
}
