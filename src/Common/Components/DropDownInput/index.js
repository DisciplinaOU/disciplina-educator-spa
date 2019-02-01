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
    const { isSelectOpened } = this.state;
    isSelectOpened ? this.closeSelect() : this.openSelect();
  }

  openSelect = () => this.setState ({ isSelectOpened: true })

  closeSelect = () => this.setState({ isSelectOpened: false })

  changeSelectValue = (e: SyntheticEvent<HTMLSelectElement>) => this.setState({ value: e.currentTarget.dataset.value })

  render() {
    const {  id, title, list, className } = this.props;
    const { isSelectOpened, value } = this.state;
    return (
      <div
        className={`dropdown-input ${isSelectOpened ? 'active' : ''} ${className ? className : ""}`}
        onClick={this.changeSelectState}
      >
        <label className="dropdown-input__label">{title}</label>
        <input
          id={id}
          className="dropdown-input__field"
          type="text"
          value={value}
          />
        <ul className="dropdown-input__list">
          { list.map((item) =>
            <li
              className="dropdown-input__item"
              key={item.id} data-value={item}
              onClick={this.changeSelectValue}>{item}
            </li>
          )}
        </ul>
      </div>
    );
  }
}
