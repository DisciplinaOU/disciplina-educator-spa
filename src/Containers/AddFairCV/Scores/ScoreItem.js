// @flow
import React, { memo, useState } from "react";
import type { ScoresDataType } from "./index";
import RegularInput from "../../../Common/Components/RegularInput";
import DropDownInput from "../../../Common/Components/DropDownInput";
import Button from "../../../Common/Components/Button";

type ScoreItemProps = {
  isNewScore: boolean,
  dispatchScore: (data: ScoresDataType, scoreIndex?: number) => void,
  scoreData?: ScoresDataType,
  scoreIndex?: number,
  remove: (scoreIndex: number) => void
};

export const ScoreItem = (props: ScoreItemProps) => {
  const { scoreData, dispatchScore, isNewScore, scoreIndex = -1, remove } = props;
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

  const checkScoreSaveAvailable = () => subject.length && lang.length && hours.length && credits.length && grade.length;

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
        <RegularInput value={subject} dispatchValue={setSubject} />
        {!isScoresSaveAvailable ? (
          <span className="login-form__message login-form__message--scores">Fill all inputs</span>
        ) : null}
      </div>
      <div className="table__item table__item--lang">
        <DropDownInput selectedValue={lang} list={["en", "ru"]} callback={setLanguage} />
      </div>
      <div className="table__item table__item--hours">
        <RegularInput value={hours} dispatchValue={setHours} />
      </div>
      <div className="table__item table__item--credits">
        <RegularInput value={credits} dispatchValue={setCredits} />
      </div>
      <div className="table__item table__item--score">
        <DropDownInput
          selectedValue={grade}
          list={["отлично", "хорошо", "удовлетворительно", "зачтено"]}
          callback={setGrade}
        />
      </div>
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
        <span className="btn btn--edit">&nbsp;</span>
      </div>
      <div className="table__item table__item--button table__item--button-remove" onClick={handleRemove}>
        <span className="btn btn--remove">&nbsp;</span>
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
