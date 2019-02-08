// @flow
import React, { PureComponent } from "react";
import "./styles.scss";
import DatePicker from "react-datepicker";
import Button from "../../Common/Components/Button";
import RegularInput from "../../Common/Components/RegularInput";
import DropDownInput from "../../Common/Components/DropDownInput";
import Scores from "./Scores";
import Reminder from "./Reminder";
import FaircvService from "../../Services/faircv";
import "react-datepicker/dist/react-datepicker.css";
import type { ScoresDataType } from "./Scores";

type EducationFormEnum = "fulltime" | "parttime" | "fullpart";

type AddFairCVState = {
  grades: Array<ScoresDataType>,
  studentName: string,
  studentBirthDate: Date,
  startYear: number,
  endYear: number,
  educationForm: EducationFormEnum,
  number: number | string,
  issueDate: Date,
  title: string,
  major: string,
  specialization?: string
};

export class AddFairCV extends PureComponent<{}, AddFairCVState> {
  state = {
    grades: [],
    studentName: "",
    studentBirthDate: new Date(),
    startYear: 2019,
    endYear: 2019,
    educationForm: "fulltime",
    number: "",
    issueDate: new Date(),
    title: "",
    major: "",
    specialization: ""
  };

  updateGrades = (grades: Array<ScoresDataType>) => {
    this.setState({ grades });
  };

  addNewFaircv = async () => {
    const newCertificate = this.normalizeRequest();
    await FaircvService.create(newCertificate);
  };

  handleStudentName = (v: string) => this.setState({ studentName: v });

  handleStudentBirthDate = (v: Date) => this.setState({ studentBirthDate: v });

  handleStartYear = (v: number) => this.setState({ startYear: v });

  handleEndYear = (v: number) => this.setState({ endYear: v });

  handleEducationForm = (v: EducationFormEnum) => this.setState({ educationForm: v });

  handleNumber = (v: string) => this.setState({ number: v });

  handleIssueDate = (v: Date) => this.setState({ issueDate: v });

  handleTitle = (v: string) => this.setState({ title: v });

  handleMajor = (v: string) => this.setState({ major: v });

  handleSpecialization = (v: string) => this.setState({ specialization: v });

  _formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDay();
    return `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`;
  };

  normalizeRequest = () => {
    const {
      studentName,
      number,
      title,
      major,
      specialization,
      studentBirthDate,
      issueDate,
      startYear,
      endYear,
      educationForm,
      grades
    } = this.state;
    return {
      meta: {
        studentName,
        studentBirthDate: this._formatDate(studentBirthDate),
        startYear: +startYear,
        endYear: +endYear,
        educationForm,
        number: +number,
        issueDate: this._formatDate(issueDate),
        title,
        major,
        specialization
      },
      grades
    };
  };

  render() {
    const {
      studentName,
      number,
      title,
      major,
      specialization = "",
      studentBirthDate,
      issueDate,
      educationForm,
      startYear,
      endYear
    } = this.state;
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
                  value={studentName}
                  title="Фамилия, имя, отчество"
                  className="input-student"
                  width="full-width"
                  dispatchValue={this.handleStudentName}
                />
                <div className="input data-input">
                  <label className="data-input__label">Дата рождения</label>
                  <DatePicker
                    selected={studentBirthDate}
                    onChange={this.handleStudentBirthDate}
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
              </div>
            </div>
            <div className="add-form__item input-container">
              <h2 className="input-container__title text-left">Обучение</h2>
              <div className="input-group">
                <DropDownInput
                  list={[1, 2, 3]}
                  selectedValue={startYear}
                  title="Год поступления"
                  className="input-education-start"
                  callback={this.handleStartYear}
                />
                <DropDownInput
                  list={[1, 2, 3]}
                  selectedValue={endYear}
                  title="Год окончания"
                  className="input-education-end"
                  callback={this.handleEndYear}
                />
                <DropDownInput
                  list={[1, 2, 3]}
                  selectedValue={educationForm}
                  title="Форма обучения"
                  className="input-education-form"
                  callback={this.handleEducationForm}
                />
              </div>
            </div>
            <div className="add-form__item input-container">
              <h2 className="input-container__title text-left">Диплом</h2>
              <div className="input-group">
                <RegularInput
                  value={number}
                  title="Номер"
                  className="input-number"
                  width="full-width"
                  dispatchValue={this.handleNumber}
                />
                <div className="input data-input">
                  <label className="data-input__label">Дата выдачи</label>
                  <DatePicker selected={issueDate} onChange={this.handleIssueDate} dateFormat="yyyy-MM-dd" />
                </div>
              </div>
              <RegularInput
                value={title}
                title="Присвоено звание"
                width="full-width"
                className="input-rank"
                dispatchValue={this.handleTitle}
              />
              <RegularInput
                value={major}
                title="Специальность"
                width="full-width"
                className="input-speciality"
                dispatchValue={this.handleMajor}
              />
              <RegularInput
                value={specialization}
                title="Специализация (если есть)"
                width="full-width"
                className="input-specialization"
                dispatchValue={this.handleSpecialization}
              />
            </div>
            <Scores dispatchScores={this.updateGrades} />
          </form>
        </div>
        <Reminder className="container" dispatchSubmit={this.addNewFaircv} />
      </div>
    );
  }
}

export default AddFairCV;
