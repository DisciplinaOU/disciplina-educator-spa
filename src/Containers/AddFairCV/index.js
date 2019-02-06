// @flow
import React, { PureComponent } from "react";
import "./styles.scss";
import DatePicker from "react-datepicker";
import Button from "../../Common/Components/Button";
import RegularInput from "../../Common/Components/RegularInput";
import DropDownInput from "../../Common/Components/DropDownInput";
import Scores from "./Scores";
import Reminder from "./Reminder";
import "react-datepicker/dist/react-datepicker.css";

type AddFairCVState = {
  startDate: Date
};

export class AddFairCV extends PureComponent<{}, AddFairCVState> {
  state = {
    startDate: new Date()
  };

  handleChange = (date: Date) => this.setState({ startDate: date });

  render() {
    const { startDate } = this.state;
    return (
      <div className="add-form">
        <Modal mоdalContent={modalContent}/>
        <div className="container">
          <div className="navigation-link text-left">
            <Button
              text="Вернуться к списку"
              modWidth="width-auto"
              modHeight="height-big"
              modStyle="arrow-back"
              modColor="color-main"
              callback={() => {}}
            />
          </div>
          <h1 className="add-form__title">Добавление FairCV</h1>
          <form>
            <div className="add-form__item input-container">
              <h2 className="input-container__title text-left">Студент</h2>
              <div className="input-group">
                <RegularInput
                  title="Фамилия, имя, отчество"
                  className="input-sudent"
                  width="full-width"
                  dispatchValue={() => {}}
                />
                <div className="input data-input">
                  <label className="data-input__label">Дата рождения</label>
                  <DatePicker
                    selected={startDate}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="add-form__item input-container">
              <h2 className="input-container__title text-left">Обучение</h2>
              <div className="input-group">
                <DropDownInput
                  list={["1", "2", "3"]}
                  title="Год поступления"
                  className="input-education-start"
                  callback={() => {}}
                />
                <DropDownInput
                  list={["1", "2", "3"]}
                  title="Год окончания"
                  className="input-education-end"
                  callback={() => {}}
                />
                <DropDownInput
                  list={["1", "2", "3"]}
                  title="Форма обучения"
                  className="input-education-form"
                  callback={() => {}}
                />
              </div>
            </div>
            <div className="add-form__item input-container">
              <h2 className="input-container__title text-left">Диплом</h2>
              <div className="input-group">
                <RegularInput
                  title="Номер"
                  className="input-number"
                  width="full-width"
                  dispatchValue={() => {}}
                />
                <div className="input data-input">
                  <label className="data-input__label">Дата выдачи</label>
                  <DatePicker
                    selected={startDate}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <RegularInput
                title="Присвоено звание"
                width="full-width"
                className="input-rank"
                dispatchValue={() => {}}
              />
              <RegularInput
                title="Специальность"
                width="full-width"
                className="input-speciality"
                dispatchValue={() => {}}
              />
              <RegularInput
                title="Специализация (если есть)"
                width="full-width"
                className="input-specialization"
                dispatchValue={() => {}}
              />
            </div>
            <Scores dispatchScores={() => {}} />
          </form>
        </div>
        <Reminder className="container"/>
      </div>
    );
  }
}

export default AddFairCV
