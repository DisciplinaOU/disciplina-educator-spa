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
  scoreIndex?: number
};

export const ScoreItem = (props: ScoreItemProps) => {
  const { scoreData, dispatchScore, isNewScore, scoreIndex = -1 } = props;
  const [course, setCourse] = useState((scoreData && scoreData.course) || "");
  const [language, setLanguage] = useState((scoreData && scoreData.language) || "");
  const [hours, setHours] = useState((scoreData && scoreData.hours) || "");
  const [credits, setCredits] = useState((scoreData && scoreData.credits) || "");
  const [score, setScore] = useState((scoreData && scoreData.score) || "");
  const [isEditMode, setEditMode] = useState(isNewScore);
  const enableEditMode = () => setEditMode(true);
  const clearInputs = () => {
    setScore("");
    setCredits("");
    setHours("");
    setLanguage("");
    setCourse("");
  };
  const addNewScore = () => {
    dispatchScore({ course, language, hours, credits, score });
    clearInputs();
  };
  const updateScore = () => {
    dispatchScore({ course, language, hours, credits, score }, scoreIndex);
    setEditMode(false);
  };

  return isEditMode ? (
    <div className="table__row table__form">
      <div className="table__item table__item--course">
        <RegularInput value={course} dispatchValue={setCourse} />
      </div>
      <div className="table__item table__item--lang">
        <DropDownInput selectedValue={language} list={["1", "2", "3"]} callback={setLanguage} />
      </div>
      <div className="table__item table__item--hours">
        <RegularInput value={hours} dispatchValue={setHours} />
      </div>
      <div className="table__item table__item--credits">
        <RegularInput value={credits} dispatchValue={setCredits} />
      </div>
      <div className="table__item table__item--score">
        <DropDownInput selectedValue={score} list={["1", "2", "3"]} callback={setScore} />
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
      <div className="table__item table__item--course">{course}</div>
      <div className="table__item table__item--lang">{language}</div>
      <div className="table__item table__item--hours">{hours}</div>
      <div className="table__item table__item--credits">{credits}</div>
      <div className="table__item table__item--score">{score}</div>
      <div className="table__item table__item--button" onClick={enableEditMode}>
        <span className="btn btn--edit">&nbsp;</span>
      </div>
      <div className="table__item table__item--button">
        <span className="btn btn--del">&nbsp;</span>
      </div>
    </div>
  );
};

ScoreItem.defaultProps = {
  scoreData: {
    course: "",
    language: "",
    hours: "",
    credits: "",
    score: ""
  },
  scoreIndex: -1
};

export default memo<ScoreItemProps>(ScoreItem);
