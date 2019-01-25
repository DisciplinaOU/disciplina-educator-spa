// @flow
import React, { PureComponent } from 'react';
import './styles.scss';

type RegularInputProps = {
  value?: string
};

export default class RegularInput extends PureComponent<RegularInputProps> {
  static defaultProps = {
  };

  render() {
    const {  value } = this.props;
    return (
      <div className="regular-input">
        <label className="regular-input__label">123</label>
        <input
          className="regular-input__field"
          type="text"
          value={ value }
          />
      </div>
    );
  }
}
