// @flow
import React from "react";
import "./styles.scss";

type RegularInputState = {
  showErrorClass: boolean
};

type RegularInputProps = {
  value: any,
  title?: string,
  placeholder?: string,
  width?: string,
  dispatchValue: (value: any) => void,
  className?: string,
  existErrorCondition?: boolean,
  isFormError?: boolean
};

export default class RegularInput extends React.PureComponent<RegularInputProps, RegularInputState> {
  static defaultProps = {
    title: "",
    placeholder: "",
    width: " auto-width",
    className: "",
    existErrorCondition: false,
    isFormError: false
  };

  state = {
    showErrorClass: false
  };

  onBlurHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    const { existErrorCondition } = this.props;
    if (existErrorCondition) this.setState({ showErrorClass: !e.currentTarget.value });
  };

  onChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    const { dispatchValue } = this.props;
    dispatchValue(e.currentTarget.value);
  };

  render() {
    const { value, title, placeholder, width = " auto-width", className, isFormError } = this.props;
    const { showErrorClass } = this.state;

    return (
      <div className={`regular-input input ${className || ""}`}>
        {title ? <label className="regular-input__label">{title}</label> : null}
        <input
          className={`regular-input__field ${width} ${
            showErrorClass || isFormError ? "regular-input__field--error" : ""
          }`}
          value={value}
          placeholder={placeholder}
          type="text"
          onChange={this.onChangeHandler}
          onBlur={this.onBlurHandler}
        />
      </div>
    );
  }
}
