import React from "react";
import style from "./Button.module.css";

type Props = {
  location: string;
  text: string;
  onClickHandler: () => void;
  type?: string;
  isDisable?: boolean;
  onKeyDownHandler?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const isSubmit: boolean = props.type === "submit";

    return (
      <button
        className={`${style.button} ${style[props.location]}`}
        onClick={props.onClickHandler}
        disabled={props.isDisable}
        type={isSubmit ? "submit" : "button"}
        ref={ref}
        onKeyDown={props.onKeyDownHandler}
      >
        {props.text}
      </button>
    );
  }
);

Button.defaultProps = {
  type: "button",
  isDisable: false,
  onKeyDownHandler: () => {},
};
