// @flow
import React, { PureComponent } from "react";
import "./styles.scss";

type ButtonProps = {
  text: string,
  modWidth?: "width-auto" | "width-full",
  modHeight?: "height-small" | "height-big",
  modStyle: "filled" | "empty" | "simple" | "arrow-forward" | "arrow-back",
  modColor: "color-main" | "color-red",
  callback: () => Promise<any> | void
};

export default class Button extends PureComponent<ButtonProps> {
  static defaultProps = {
    modWidth: "width-auto",
    modHeight: "height-big"
  };

  render() {
    const { text, modStyle, modHeight = "height-big", modWidth = "width-auto", modColor, callback } = this.props;
    return (
      <button
        className={`btn btn--${modWidth} btn--${modHeight} btn--${modStyle} btn--${modColor}`}
        type="button"
        onClick={callback}
      >
        {text}
      </button>
    );
  }
}
