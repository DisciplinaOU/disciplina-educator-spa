// @flow
import React, { memo } from "react";
import "./styles.scss";

type ButtonProps = {
  text: string,
  modWidth?: "width-auto" | "width-full",
  modHeight?: "height-small" | "height-big",
  modStyle: "filled" | "empty" | "simple" | "arrow-forward" | "arrow-back",
  modColor: "color-main" | "color-red",
  callback: (e: any) => Promise<any> | void,
  type?: "button" | "submit"
};

const Button = (props: ButtonProps) => {
  const {
    text,
    modStyle,
    modHeight = "height-big",
    modWidth = "width-auto",
    modColor,
    callback,
    type = "button"
  } = props;
  return (
    /*eslint react/button-has-type: off */
    <button
      className={`btn btn--${modWidth} btn--${modHeight} btn--${modStyle} btn--${modColor}`}
      type={type}
      onClick={callback}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  modWidth: "width-auto",
  modHeight: "height-big",
  type: "button"
};

export default memo<ButtonProps>(Button);
