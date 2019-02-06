// @flow
import React, { PureComponent } from "react";
import Button from "../../Button";

type MessageProps = {
  img: string,
  title: string,
  text?: string,
  buttonText?: string
};

export class Message extends PureComponent<MessageProps> {
  static defaultProps = {
    text: "",
    buttonText: ""
  };

  render() {
    const { img, title, text, buttonText = "" } = this.props;
    return (
      <div className="mail_confirmed">
        <img className="mail_confirmed__img" src={img} alt="" />
        <h3 className="mail_confirmed__title">{title}</h3>
        {text && text.length ? <p className="mail_confirmed__text">{text}</p> : null}
        {buttonText && buttonText.length ? (
          <Button
            text={buttonText}
            modWidth="width-auto"
            modHeight="height-big"
            modStyle="filled"
            modColor="color-main"
            callback={() => {}}
          />
        ) : null}
      </div>
    );
  }
}

export default Message;
