// @flow
import React, { memo } from "react";
import Button from "../../Button";

type MessageProps = {
  img: string,
  title: string,
  text?: string,
  buttonText?: string
};

const Message = (props: MessageProps) => {
  const goToAuth = () => {
    window.history.replaceState(null, null, window.location.pathname);
    window.location.pathname = "/auth";
  };
  const { img, title, text, buttonText = "" } = props;
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
          callback={goToAuth}
        />
      ) : null}
    </div>
  );
};

Message.defaultProps = {
  text: "",
  buttonText: ""
};

export default memo<MessageProps>(Message);
