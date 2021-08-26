// @flow
import React, { memo } from "react";
import Button from "../../../Common/Components/Button";
import "./styles.scss";

type ReminderProps = {
  dispatchSubmit: () => Promise<any>,
  className?: string,
  isFormError: boolean
};

export const Reminder = ({ dispatchSubmit, className = "", isFormError }: ReminderProps) => {
  return (
    <div className={`reminder ${className}`}>
      <div className="container">
        <div className={`reminder__text ${isFormError ? "reminder__text--error" : ""}`}>
          <span />
          {isFormError ?
          <p>Fill in all the fields</p>
          : <p>Please check all data carefully before saving. It will be impossible to change the saved records!</p>
          }
        </div>
        <Button
          text="Save the FairCV"
          modWidth="width-auto"
          modHeight="height-big"
          modStyle="filled"
          modColor="color-main"
          callback={dispatchSubmit}
        />
      </div>
    </div>
  );
};

Reminder.defaultProps = {
  className: ""
};

export default memo<ReminderProps>(Reminder);
