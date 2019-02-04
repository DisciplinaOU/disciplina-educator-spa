// @flow
import React, { PureComponent } from 'react';
import './styles.scss';

type RegularInputProps = {
  id?: string,
  value?: string,
  title?: string,
  placeholder?: string,
  width?: string,
  dispatchValue: (value: any) => void,
  className?: string
};

export default class RegularInput extends PureComponent<RegularInputProps> {
  onChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    const { dispatchValue } = this.props;
    dispatchValue(e.currentTarget.value);
  };
  render() {
    const {  id, value, title, placeholder, width, className } = this.props;
    return (
      <div className={`regular-input input ${className ? className : ""}`}>
        { title ? <label className="regular-input__label">{title}</label>: null}
        <input
          className={`regular-input__field${(width === "full") ? " full-width" : " auto-width"}`}
          id={id}
          value={value}
          placeholder={placeholder}
          type="text"
          onChange={this.onChangeHandler}
        />
      </div>
    );
  }
}
