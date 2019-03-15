// @flow
import React, { memo } from "react";
import emailImg from "../../Assets/email.svg";
import studentImg from "../../Assets/student.svg";
import personImg from "../../Assets/person.svg";
import Message from "./Components/Message";
import "./styles.scss";

export const MAIN_MESSAGE_STATE = {
  CONFIRMED: "CONFIRMED",
  NOT_CONFIRMED: "NOT_CONFIRMED",
  LIST_EMPTY: "LIST_EMPTY",
  CHECK_EMAIL: "CHECK_EMAIL"
};

type MainMessageProps = {
  type: string
};

const MainMessage = (props: MainMessageProps) => {
  const { type } = props;
  return (
    <div className="main-message">
      <div className="container">
        {
          {
            [MAIN_MESSAGE_STATE.CONFIRMED]: (
              <Message
                img={emailImg}
                title="Ваш адрес электронной почты подтвержден"
                text="Чтобы продолжить, войдите в систему:"
                buttonText="Вход с паролем"
              />
            ),
            [MAIN_MESSAGE_STATE.NOT_CONFIRMED]: (
              <Message
                img={studentImg}
                title="Ваша учетная запись еще не&nbsp;подтверждена как учебное заведение."
                text="Мы&nbsp;сообщим о&nbsp;подтверждении письмом на&nbsp;указанную электронную почту."
              />
            ),
            [MAIN_MESSAGE_STATE.LIST_EMPTY]: (
              <Message img={personImg} title="Вы&nbsp;еще не&nbsp;создали ни&nbsp;одного FairCV" />
            ),
            [MAIN_MESSAGE_STATE.CHECK_EMAIL]: (
              <Message
                img={emailImg}
                title="Проверьте вашу электронную почту"
                text="Мы выслали на нее письмо со&nbsp;ссылкой для подтверждения адреся"
              />
            )
          }[type]
        }
      </div>
    </div>
  );
};

export default memo<MainMessageProps>(MainMessage);
