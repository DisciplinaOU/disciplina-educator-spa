// @flow
import React from "react";
import "./styles.scss";

type RegularInputState = {
  existInputError: boolean
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
    existInputError: false
  };

  onBlurHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    const { existErrorCondition } = this.props;
    if (existErrorCondition) this.setState({ existInputError: !e.currentTarget.value });
  };

  onChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    const { dispatchValue } = this.props;
    dispatchValue(e.currentTarget.value);
  };

  inputHasErrorCheck = () => {
    const { existInputError } = this.state;
    const { isFormError, value } = this.props;
    return existInputError || (isFormError && !value);
  };

  render() {
    const { value, title, placeholder, width = " auto-width", className } = this.props;
    const inputHasError = this.inputHasErrorCheck();

    return (
      <div className={`regular-input input ${className || ""}`}>
        {title ? <label className="regular-input__label">{title}</label> : null}
        <input
          className={`regular-input__field ${width} ${inputHasError ? "regular-input__field--error" : ""}`}
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
