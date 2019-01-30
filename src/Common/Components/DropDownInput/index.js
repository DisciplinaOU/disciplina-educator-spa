// @flow
import React, { PureComponent } from 'react';
import './styles.scss';

type DropDownInputProps = {
  value?: string,
  title: string,
  list: array,
  callback: () => void
};

type DropDownInputState = {
  selectOpen: boolean,
  value: string
}

export default class DropDownInput extends PureComponent<DropDownInputProps, DropDownInputState> {

  state = {
    selectOpen: false,
    value: "start"
  }

  changeSelectState = () => {
    if(this.state.selectOpen){
      this.setState({
        selectOpen: false
      })
    } else {
      this.setState({
        selectOpen: true
      })
    }
  }

  changeSelectValue = (i) => {
    this.setState({
      value: i
    })
  }

  render() {
    const {  id, title, list, className } = this.props;
    const { selectOpen, value } = this.state;
    return (
      <div className={`dropdown-input ${selectOpen ? 'active' : ''} ${className ? className : ""}`} onClick={this.changeSelectState}>
        <label className="dropdown-input__label">{ title }</label>
        <input
          id={id || undefined}
          className="dropdown-input__field"
          type="text"
          value={value}
          />
        <ul className="dropdown-input__list">
          { list.map((item, i) =>
            <li className="dropdown-input__item" key={ i } onClick={ this.changeSelectValue(item) }>{ item }</li>
          )}
        </ul>
      </div>
    );
  }
}
