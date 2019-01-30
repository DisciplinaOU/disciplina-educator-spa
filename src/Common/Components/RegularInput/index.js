// @flow
import React, { PureComponent } from 'react';
import './styles.scss';

type RegularInputProps = {
  id?: string,
  value?: string,
  title: string,
  placeholder: string,
  width?: string
};

export default class RegularInput extends PureComponent<RegularInputProps> {
  static defaultProps = {
  };

  render() {
    const {  id, value, title, placeholder, width, className } = this.props;
    return (
      <div className={`regular-input input ${className ? className : ""}`}>
        <label className="regular-input__label">{ title }</label>
        <input
          className={`regular-input__field${(width === "full") ? " full-width" : " auto-width"}`}
          id={ id || undefined}
          value={ value }
          placeholder={placeholder}
          type="text"
          />
      </div>
    );
  }
}
