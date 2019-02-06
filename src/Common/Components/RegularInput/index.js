// @flow
import React, { PureComponent } from "react";
import "./styles.scss";

type RegularInputProps = {
  value?: string,
  title?: string,
  placeholder?: string,
  width?: string,
  dispatchValue: (value: any) => void,
  className?: string
};

export default class RegularInput extends PureComponent<RegularInputProps> {
  static defaultProps = {
    value: "",
    title: "",
    placeholder: "",
    width: " auto-width",
    className: ""
  };

  onChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    const { dispatchValue } = this.props;
    dispatchValue(e.currentTarget.value);
  };

  render() {
    const { value, title, placeholder, width = " auto-width", className } = this.props;
    return (
      <div className={`regular-input input ${className || ""}`}>
        {title ? <label className="regular-input__label">{title}</label> : null}
        <input
          className={`regular-input__field ${width}`}
          value={value}
          placeholder={placeholder}
          type="text"
          onChange={this.onChangeHandler}
        />
      </div>
    );
  }
}
