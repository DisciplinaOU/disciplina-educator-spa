// @flow
import React, { memo, useState } from "react";
import type { ScoresDataType } from "./index";
import RegularInput from "../../../Common/Components/RegularInput";
import DropDownInput from "../../../Common/Components/DropDownInput";
import Button from "../../../Common/Components/Button";
import editIcon from "../../../Common/Assets/icons/edit-icon.svg";
import removeIcon from "../../../Common/Assets/icons/del-icon.svg";

type ScoreItemProps = {
  isNewScore: boolean,
  dispatchScore: (data: ScoresDataType, scoreIndex?: number) => void,
  scoreData?: ScoresDataType,
  scoreIndex?: number,
  remove: (scoreIndex: number) => void,
  isFormError: boolean
};

const LANGUAGES_LIST = ["en", "zh"];
const SCORES_LIST = ["excellent", "good", "adequate", "pass"];

export const ScoreItem = (props: ScoreItemProps) => {
  const { scoreData, dispatchScore, isNewScore, scoreIndex = -1, remove, isFormError } = props;
  const [subject, setSubject] = useState((scoreData && scoreData.subject) || "");
  const [lang, setLanguage] = useState((scoreData && scoreData.lang) || "");
  const [hours, setHours] = useState((scoreData && scoreData.hours) || "");
  const [credits, setCredits] = useState((scoreData && scoreData.credits) || "");
  const [grade, setGrade] = useState((scoreData && scoreData.grade) || "");
  const [isEditMode, setEditMode] = useState(isNewScore);
  const [isScoresSaveAvailable, setScoresAvailable] = useState(true);
  const enableEditMode = () => setEditMode(true);
  const clearInputs = () => {
    setGrade("");
    setCredits("");
    setHours("");
    setLanguage("");
    setSubject("");
  };

  const checkIsNumber = value => {
    const regexp = /^\d+$/;
    return value.match(regexp);
  };

  const checkScoreSaveAvailable = () => {
    const isHoursAvailable = checkIsNumber(hours.toString());
    const isCreditsEmpty = !credits;
    const isCreditsAvailable = checkIsNumber(credits.toString());
    return (
      subject.length &&
      lang.length &&
      hours.toString().length &&
      grade.length &&
      isHoursAvailable &&
      (isCreditsEmpty || isCreditsAvailable)
    );
  };

  const addNewScore = () => {
    setScoresAvailable(true);
    const isAvailable = checkScoreSaveAvailable();
    if (isAvailable) {
      dispatchScore({ subject, lang, hours: +hours, credits: +credits, grade });
      clearInputs();
    } else {
      setScoresAvailable(false);
    }
  };
  const updateScore = () => {
    setScoresAvailable(true);
    const isAvailable = checkScoreSaveAvailable();
    if (isAvailable) {
      dispatchScore({ subject, lang, hours: +hours, credits: +credits, grade }, scoreIndex);
      setEditMode(false);
    } else {
      setScoresAvailable(false);
    }
  };

  const handleRemove = () => remove(scoreIndex);

  return isEditMode ? (
    <div className="table__row table__form">
      <div className="table__item table__item--course">
        <RegularInput
          value={subject}
          dispatchValue={setSubject}
          existErrorCondition
          isFormError={!isScoresSaveAvailable || isFormError}
        />
      </div>
      <div className="table__item table__item--lang">
        <DropDownInput
          selectedValue={lang}
          list={LANGUAGES_LIST}
          callback={setLanguage}
          existErrorCondition
          isFormError={!isScoresSaveAvailable || isFormError}
        />
      </div>
      <div className="table__item table__item--hours">
        <RegularInput
          value={hours}
          dispatchValue={setHours}
          existErrorCondition
          isFormError={!isScoresSaveAvailable || isFormError}
        />
      </div>
      <div className="table__item table__item--credits">
        <RegularInput value={credits} dispatchValue={setCredits} />
      </div>
      <div className="table__item table__item--score">
        <DropDownInput
          selectedValue={grade}
          list={SCORES_LIST}
          callback={setGrade}
          existErrorCondition
          isFormError={!isScoresSaveAvailable || isFormError}
        />
      </div>
      {!isScoresSaveAvailable ? <span className="valid-message scores-valid-message">Check all inputs</span> : null}
      <div className="table__item table__item--submit">
        {isNewScore ? (
          <Button
            text="Добавить оценку"
            modWidth="width-auto"
            modHeight="height-big"
            modStyle="empty"
            modColor="color-main"
            callback={addNewScore}
          />
        ) : (
          <Button
            text="Сохранить изменения"
            modWidth="width-auto"
            modHeight="height-big"
            modStyle="empty"
            modColor="color-main"
            callback={updateScore}
          />
        )}
      </div>
    </div>
  ) : (
    <div className="table__row">
      <div className="table__item table__item--course">{subject}</div>
      <div className="table__item table__item--lang">{lang}</div>
      <div className="table__item table__item--hours">{hours}</div>
      <div className="table__item table__item--credits">{credits}</div>
      <div className="table__item table__item--score">{grade}</div>
      <div className="table__item table__item--button table__item--button-edit" onClick={enableEditMode}>
        <img src={editIcon} alt="" className="button--edit" />
      </div>
      <div className="table__item table__item--button table__item--button-remove" onClick={handleRemove}>
        <img src={removeIcon} alt="" className="button--remove" />
      </div>
    </div>
  );
};

ScoreItem.defaultProps = {
  scoreData: {
    subject: "",
    lang: "",
    hours: null,
    credits: null,
    grade: "",
    scale: ""
  },
  scoreIndex: -1
};

export default memo<ScoreItemProps>(ScoreItem);
