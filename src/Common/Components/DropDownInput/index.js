// @flow
import React, { PureComponent } from "react";
import "./styles.scss";

type DropDownInputProps = {
  title?: string,
  list: Array<number | string>,
  callback: (v: any) => void,
  className?: string
};

type DropDownInputState = {
  isSelectOpened: boolean,
  selectedValue: number
};

export default class DropDownInput extends PureComponent<DropDownInputProps, DropDownInputState> {
  static defaultProps = {
    title: "",
    className: ""
  };

  state = {
    isSelectOpened: false,
    selectedValue: 0
  };

  changeSelectState = () => {
    const { isSelectOpened } = this.state;
    isSelectOpened ? this.closeSelect() : this.openSelect();
  };

  openSelect = () => this.setState({ isSelectOpened: true });

  closeSelect = () => this.setState({ isSelectOpened: false });

  changeSelectValue = (e: SyntheticEvent<HTMLSelectElement>) => {
    const { callback } = this.props;
    const { value } = e.currentTarget.dataset;
    this.setState({ selectedValue: +value });
    callback(value);
  };

  render() {
    const { title, list, className } = this.props;
    const { isSelectOpened, selectedValue } = this.state;
    return (
      <div
        className={`dropdown-input ${isSelectOpened ? "active" : ""} ${className || ""}`}
        onClick={this.changeSelectState}
      >
        <label className="dropdown-input__label">{title}</label>
        <input className="dropdown-input__field" type="text" value={selectedValue} />
        <ul className="dropdown-input__list">
          {list.map(item => (
            <li className="dropdown-input__item" data-value={item} onClick={this.changeSelectValue}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
