// @flow
import * as React from "react";
import "./styles.scss";

type DropDownInputProps = {
  selectedValue: any,
  title?: string,
  list: Array<any>,
  callback: (v: any) => void,
  className?: string,
  existErrorCondition?: boolean,
  isFormError?: boolean
};

type DropDownInputState = {
  isSelectOpened: boolean,
  existInputError: boolean
};

export default class DropDownInput extends React.PureComponent<DropDownInputProps, DropDownInputState> {
  node: React.ElementRef<any> = React.createRef();

  static defaultProps = {
    title: "",
    className: "",
    existErrorCondition: false,
    isFormError: false
  };

  state = {
    isSelectOpened: false,
    existInputError: false
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
    const { callback, existErrorCondition } = this.props;
    const { value } = e.currentTarget.dataset;
    if (existErrorCondition && value) this.setErrorClass(false);
    callback(value);
  };

  onBlurHandler = () => {
    const { existErrorCondition, selectedValue } = this.props;
    if (existErrorCondition) {
      this.setErrorClass(!selectedValue);
    }
  };

  setErrorClass = (isError: boolean) => this.setState({ existInputError: isError });

  render() {
    const { title, list, className, selectedValue, isFormError } = this.props;
    const { isSelectOpened, existInputError } = this.state;
    const inputHasError = existInputError || (isFormError && !selectedValue);
    return (
      <div
        className={`dropdown-input ${isSelectOpened ? "active" : ""} ${className || ""}`}
        onClick={this.changeSelectState}
        ref={node => {
          this.node = node;
        }}
      >
        {title ? <label className="dropdown-input__label">{title}</label> : null}
        <input
          className={`dropdown-input__field ${inputHasError ? "dropdown-input__field--error" : ""}`}
          type="text"
          readOnly
          value={selectedValue}
          onBlur={this.onBlurHandler}
        />
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
