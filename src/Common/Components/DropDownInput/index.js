// @flow
import React, { PureComponent } from 'react';
import './styles.scss';

type DropDownInputProps = {
  value?: string,
  title: string,
  list: Array<string>,
  callback: () => void
};

type DropDownInputState = {
  isSelectOpened: boolean,
  value: string
}

export default class DropDownInput extends PureComponent<DropDownInputProps, DropDownInputState> {

  state = {
    isSelectOpened: false,
    value: "start"
  }

  changeSelectState = () => {
    const opened = this.state.isSelectOpened;
    opened ? this.closeSelect() : this.openSelect();
  }

  openSelect = () => {
    this.setState ({
      isSelectOpened: true
    })
  }

  closeSelect = () => {
    this.setState({
      isSelectOpened: false
    })
  }

  changeSelectValue = (e) => {
    this.setState({
      value: e.currentTarget.dataset.value
    })
  }

  render() {
    const {  id, title, list, className } = this.props;
    const { isSelectOpened, value } = this.state;
    return (
      <div className={`dropdown-input ${isSelectOpened ? 'active' : ''} ${className ? className : ""}`} onClick={this.changeSelectState}>
        <label className="dropdown-input__label">{title}</label>
        <input
          id={id || undefined}
          className="dropdown-input__field"
          type="text"
          value={value}
          />
        <ul className="dropdown-input__list">
          { list.map((i) =>
            <li className="dropdown-input__item" key={i.id} data-value={i} onClick={this.changeSelectValue}>{i}</li>
          )}
        </ul>
      </div>
    );
  }
}
