// @flow
import * as React from "react";
import "./styles.scss";

type DropDownInputProps = {
  selectedValue: any,
  title?: string,
  list: Array<any>,
  callback: (v: any) => void,
  className?: string
};

type DropDownInputState = {
  isSelectOpened: boolean
};

export default class DropDownInput extends React.PureComponent<DropDownInputProps, DropDownInputState> {
  node: React.ElementRef<any> = React.createRef();

  static defaultProps = {
    title: "",
    className: ""
  };

  state = {
    isSelectOpened: false
  };

  handleOutsideClick = (e: { target: EventTarget }) => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.changeSelectState();
  };

  changeSelectState = () => {
    const { isSelectOpened } = this.state;
    if (isSelectOpened) {
      document.removeEventListener("click", this.handleOutsideClick, false);
      this.closeSelect();
    } else {
      document.addEventListener("click", this.handleOutsideClick, false);
      this.openSelect();
    }
  };

  openSelect = () => this.setState({ isSelectOpened: true });

  closeSelect = () => this.setState({ isSelectOpened: false });

  changeSelectValue = (e: SyntheticEvent<HTMLSelectElement>) => {
    const { callback } = this.props;
    const { value } = e.currentTarget.dataset;
    callback(value);
  };

  render() {
    const { title, list, className, selectedValue } = this.props;
    const { isSelectOpened } = this.state;
    return (
      <div
        className={`dropdown-input ${isSelectOpened ? "active" : ""} ${className || ""}`}
        onClick={this.changeSelectState}
        ref={this.node}
      >
        {title ? <label className="dropdown-input__label">{title}</label> : null}
        <input className="dropdown-input__field" type="text" readOnly value={selectedValue} />
        <div className="dropdown-input__list-container">
          <ul className="dropdown-input__list">
            {list.map(item => (
              <li className="dropdown-input__item" data-value={item} onClick={this.changeSelectValue} key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
