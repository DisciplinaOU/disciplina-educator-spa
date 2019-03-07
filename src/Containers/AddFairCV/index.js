// @flow
import * as React from "react";
import base64url from "base64url";
import "./styles.scss";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import Button from "../../Common/Components/Button";
import RegularInput from "../../Common/Components/RegularInput";
import DropDownInput from "../../Common/Components/DropDownInput";
import Scores from "./Scores";
import Reminder from "./Reminder";
import FaircvService from "../../Services/faircv";
import "react-datepicker/dist/react-datepicker.css";
import type { ScoresDataType } from "./Scores";
import Modal from "./Modal";
import iconCalendar from "../../Common/Assets/icons/calendar-icon.svg";

type EducationFormEnum = "очная" | "заочная" | "очно-заочная";
const EDUCATION_FORM_LIST = ["очная", "заочная", "очно-заочная"];

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
  specialization?: string,
  modal: {
    state: string,
    submit: () => Promise<any>,
    cancel: () => void
  },
  yearsArray: Array<number>,
  isFormError: boolean
};

type AddFairCVProps = {
  history: any
};

const mockFn = () => {};

const clearModalState = {
  state: "",
  submit: async () => Promise.resolve({}),
  cancel: () => mockFn()
};

export class AddFairCV extends React.PureComponent<AddFairCVProps, AddFairCVState> {
  _dataPickerBirthElement: React.ElementRef<any> = React.createRef();

  _dataPickerDiplomElement: React.ElementRef<any> = React.createRef();

  state = {
    grades: [],
    studentName: "",
    studentBirthDate: new Date(),
    startYear: 2019,
    endYear: 2019,
    educationForm: "очная",
    number: "",
    issueDate: new Date(),
    title: "",
    major: "",
    specialization: "",
    modal: clearModalState,
    yearsArray: [],
    isFormError: false
  };

  componentDidMount() {
    const yearsArray = [];
    for (let i = 2019; i > 1949; i--) {
      yearsArray.push(i);
    }
    registerLocale("ru", ru);
    setDefaultLocale("ru", ru);
    this.setState({
      yearsArray
    });
  }

  goToListHandler = () => {
    const { history } = this.props;
    history.push("/faircv/list");
  };

  updateGrades = (grades: Array<ScoresDataType>) => {
    this.setState({ grades });
  };

  addNewFaircv = async () => {
    this.clearFormError();

    if (this.checkFormValid()) {
      const newCertificate = this.normalizeRequest();
      const { data } = await FaircvService.create(newCertificate);
      this.openCreatedCertModal(data.id);
    } else {
      this.setState({ isFormError: true });
    }
  };

  clearFormError = () => {
    this.setState({ isFormError: false });
  };

  checkFormValid = () => {
    const { grades, studentName, number, title, major, yearsArray } = this.state;
    return grades && studentName && number && title && major && yearsArray;
  };

  openCreatedCertModal = (id: string) => {
    this.setState({
      modal: {
        state: "SUCCESS",
        submit: async () => this.downloadPdf(id),
        cancel: () => this.goToListHandler()
      }
    });
  };

  openExitModal = () =>
    this.setState({
      modal: {
        state: "CLOSE",
        submit: async () => Promise.resolve(this.goToListHandler()),
        cancel: () => this.closeModal()
      }
    });

  getDataPickerBirthRef = (node: any) => {
    this._dataPickerBirthElement = node;
  };

  getDataPickerDiplomRef = (node: any) => {
    this._dataPickerDiplomElement = node;
  };

  openDataPickerBirthDate = () => {
    this._dataPickerBirthElement.setOpen(true);
  };

  openDataPickerDiplomDate = () => {
    this._dataPickerDiplomElement.setOpen(true);
  };

  closeModal = () => this.setState({ modal: clearModalState });

  downloadPdf = async (id: string) => {
    const downloadLink = document.createElement("a");
    downloadLink.target = "_blank";
    downloadLink.download = "certificate.pdf";

    const API_URL = process.env.REACT_APP_EDUCATOR || "";
    const downloadUrl = `${API_URL}/api/certificates/v1/cert/${this.makeCertId(id)}.pdf`;

    downloadLink.href = downloadUrl;
    if (document.body) {
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }
  };

  makeCertId = (hash: string): string => {
    const token = localStorage.getItem("token");
    if (token) {
      const baseEducatorData = token.split(".")[1];
      const decodedEducatorData = base64url.decode(baseEducatorData);
      const educator = JSON.parse(decodedEducatorData.toString());
      return base64url.encode(`${educator.data.id}:${hash}`);
    }
    return "";
  };

  handleStudentName = (v: string) => this.setState({ studentName: v, isFormError: false });

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
    const m = date.getMonth() + 1;
    const d = date.getDate();
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

    let edform: string;

    switch (educationForm) {
      case "очная":
        edform = "fulltime";
        break;
      case "заочная":
        edform = "parttime";
        break;
      case "очно-заочная":
        edform = "fullpart";
        break;
      default:
        return false;
    }

    const castedGrades: Array<{ grade: number, scale: string }> = ([...grades]: Array<any>);

    for (let i = 0; i < grades.length; i++) {
      switch (grades[i].grade) {
        case "отлично":
          castedGrades[i].grade = 100;
          castedGrades[i].scale = "rusDiff";
          break;
        case "хорошо":
          castedGrades[i].grade = 80;
          castedGrades[i].scale = "rusDiff";
          break;
        case "удовлетворительно":
          castedGrades[i].grade = 60;
          castedGrades[i].scale = "rusDiff";
          break;
        case "зачет":
          castedGrades[i].grade = 100;
          castedGrades[i].scale = "rusNonDiff";
          break;
        default:
          return false;
      }
    }
    return {
      meta: {
        studentName,
        studentBirthDate: this._formatDate(studentBirthDate),
        startYear: +startYear,
        endYear: +endYear,
        educationForm: edform,
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
      endYear,
      modal,
      yearsArray,
      isFormError
    } = this.state;
    return (
      <>
        <div className="add-form">
          <div className="container">
            <div className="navigation-link text-left">
              <Button
                text="Вернуться к списку"
                modWidth="width-auto"
                modHeight="height-big"
                modStyle="arrow-back"
                modColor="color-main"
                callback={this.openExitModal}
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
                    existErrorCondition
                    isFormError={isFormError}
                  />
                  <div className="input data-input data-input--calendar">
                    <label className="data-input__label">Дата рождения</label>
                    <div className="data-input__wrapper">
                      <DatePicker
                        showDisabledYearNavigation
                        forceShowYearNavigation
                        selected={studentBirthDate}
                        onChange={this.handleStudentBirthDate}
                        dateFormat="yyyy-MM-dd"
                        ref={this.getDataPickerBirthRef}
                        popperPlacement="bottom-start"
                        popperModifiers={{
                          flip: {
                            behavior: ["bottom"]
                          },
                          preventOverflow: {
                            enabled: false
                          },
                          hide: {
                            enabled: false
                          }
                        }}
                      />
                      <img
                        className="data-input__icon"
                        src={iconCalendar}
                        onClick={this.openDataPickerBirthDate}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-form__item input-container">
                <h2 className="input-container__title text-left">Обучение</h2>
                <div className="input-group">
                  <DropDownInput
                    list={yearsArray}
                    selectedValue={startYear}
                    title="Год поступления"
                    className="input-education-start"
                    callback={this.handleStartYear}
                  />
                  <DropDownInput
                    list={yearsArray}
                    selectedValue={endYear}
                    title="Год окончания"
                    className="input-education-end"
                    callback={this.handleEndYear}
                  />
                  <DropDownInput
                    list={EDUCATION_FORM_LIST}
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
                    existErrorCondition
                    isFormError={isFormError}
                  />
                  <div className="input data-input data-input--calendar">
                    <label className="data-input__label">Дата выдачи</label>
                    <div className="data-input__wrapper">
                      <DatePicker
                        selected={issueDate}
                        onChange={this.handleIssueDate}
                        dateFormat="yyyy-MM-dd"
                        ref={this.getDataPickerDiplomRef}
                      />
                      <img
                        className="data-input__icon"
                        src={iconCalendar}
                        onClick={this.openDataPickerDiplomDate}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <RegularInput
                  value={title}
                  title="Присвоено звание"
                  width="full-width"
                  className="input-rank"
                  dispatchValue={this.handleTitle}
                  existErrorCondition
                  isFormError={isFormError}
                />
                <RegularInput
                  value={major}
                  title="Специальность"
                  width="full-width"
                  className="input-speciality"
                  dispatchValue={this.handleMajor}
                  existErrorCondition
                  isFormError={isFormError}
                />
                <RegularInput
                  value={specialization}
                  title="Специализация (если есть)"
                  width="full-width"
                  className="input-specialization"
                  dispatchValue={this.handleSpecialization}
                />
              </div>
              <Scores dispatchScores={this.updateGrades} isFormError={isFormError} />
            </form>
          </div>
          <Reminder dispatchSubmit={this.addNewFaircv} isFormError={isFormError} />
        </div>
        {modal.state.length ? <Modal modalContent={modal.state} submit={modal.submit} cancel={modal.cancel} /> : null}
      </>
    );
  }
}

export default AddFairCV;
