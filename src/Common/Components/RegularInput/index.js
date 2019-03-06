// @flow
import React, { memo } from "react";
import "./styles.scss";

type RegularInputProps = {
  value: any,
  title?: string,
  placeholder?: string,
  width?: string,
  dispatchValue: (value: any) => void,
  className?: string
};

const RegularInput = (props: RegularInputProps) => {
  const { value, title, placeholder, width = " auto-width", className, dispatchValue } = props;
  const onChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    dispatchValue(e.currentTarget.value);
  };
  return (
    <div className={`regular-input input ${className || ""}`}>
      {title ? <label className="regular-input__label">{title}</label> : null}
      <input
        className={`regular-input__field ${width}`}
        value={value}
        placeholder={placeholder}
        type="text"
        onChange={onChangeHandler}
      />
    </div>
  );
};

RegularInput.defaultProps = {
  title: "",
  placeholder: "",
  width: " auto-width",
  className: ""
};

export default memo<RegularInputProps>(RegularInput);
