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
                title="Your email address has been verified"
                text="Please sign in to continue:"
                buttonText="Sign in using password"
              />
            ),
            [MAIN_MESSAGE_STATE.NOT_CONFIRMED]: (
              <Message
                img={studentImg}
                title="Your account has not&nbsp;yet&nbsp;been verified as a school."
                text="We&nbsp;will&nbsp;notify&nbsp;you of confirmation by a&nbsp;letter to the specified e-mail."
              />
            ),
            [MAIN_MESSAGE_STATE.LIST_EMPTY]: (
              <Message img={personImg} title="You haven't created any&nbsp;FairCVs&nbsp;yet" />
            ),
            [MAIN_MESSAGE_STATE.CHECK_EMAIL]: (
              <Message
                img={emailImg}
                title="Check your e-mail"
                text="Confirmation link sent to email"
              />
            )
          }[type]
        }
      </div>
    </div>
  );
};

export default memo<MainMessageProps>(MainMessage);
