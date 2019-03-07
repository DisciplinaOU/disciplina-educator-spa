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
          <p>Заполните все поля!</p>
          : <p>Внимательно проверьте все данные перед сохранением. Изменить сохраненные записи будет невозможно!</p>
          }
        </div>
        <Button
          text="Сохранить FairCV"
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
