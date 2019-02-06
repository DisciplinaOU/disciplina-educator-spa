// @flow
import React, { PureComponent } from "react";
import RegularInput from "../../../Common/Components/RegularInput";
import DropDownInput from "../../../Common/Components/DropDownInput";
import Button from "../../../Common/Components/Button";
import scoresData from "../scoresData";
import "./styles.scss";

type ScoresDataType = {
  course: string,
  language: string,
  hours: string,
  ectscredits: string,
  score: string
};

type ScoresProps = {
  dispatchScores: (data: ScoresDataType) => void
};

type ScoresState = ScoresDataType & {
  data: Array<ScoresDataType>
};

export class Scores extends PureComponent<ScoresProps, ScoresState> {
  state: ScoresState = {
    data: scoresData,
    course: "",
    language: "",
    hours: "",
    ectscredits: "",
    score: ""
  };

  addNewScore = () => {
    const { dispatchScores } = this.props;
    const { course, language, hours, ectscredits, score } = this.state;
    dispatchScores({ course, language, hours, ectscredits, score });
  };

  handleCourseInput = (v: string) => this.setState({ course: v });

  handleLanguageSelect = (v: string) => this.setState({ language: v });

  handleHoursInput = (v: string) => this.setState({ hours: v });

  handleEctsInput = (v: string) => this.setState({ ectscredits: v });

  handleScoreInput = (v: string) => this.setState({ score: v });

  render() {
    const { data } = this.state;

    return (
      <div className="scores">
        <h2 className="scores__title">Оценки</h2>
        <div className="scores__table table">
          <div
            className={`table__row table__row--head${data ? " active" : ""}`}
          >
            <div className="table__item table__item--course">Курс</div>
            <div className="table__item table__item--lang">Язык</div>
            <div className="table__item table__item--hours">Часов</div>
            <div className="table__item table__item--credits">ECTS credits</div>
            <div className="table__item table__item--score">Оценка</div>
            <div className="table__item table__item--button">&nbsp;</div>
            <div className="table__item table__item--button">&nbsp;</div>
          </div>
          {data
            ? data.map(item => (
                <div className="table__row" key={item.course}>
                  <div className="table__item table__item--course">
                    {item.course}
                  </div>
                  <div className="table__item table__item--lang">
                    {item.language}
                  </div>
                  <div className="table__item table__item--hours">
                    {item.hours}
                  </div>
                  <div className="table__item table__item--credits">
                    {item.ectscredits}
                  </div>
                  <div className="table__item table__item--score">
                    {item.score}
                  </div>
                  <div className="table__item table__item--button">
                    <span className="btn btn--edit">&nbsp;</span>
                  </div>
                  <div className="table__item table__item--button">
                    <span className="btn btn--del">&nbsp;</span>
                  </div>
                </div>
              ))
            : null}
          <div className="table__row table__form">
            <div className="table__item table__item--course">
              <RegularInput dispatchValue={this.handleCourseInput} />
            </div>
            <div className="table__item table__item--lang">
              <DropDownInput
                list={["1", "2", "3"]}
                callback={this.handleLanguageSelect}
              />
            </div>
            <div className="table__item table__item--hours">
              <RegularInput dispatchValue={this.handleHoursInput} />
            </div>
            <div className="table__item table__item--credits">
              <RegularInput dispatchValue={this.handleEctsInput} />
            </div>
            <div className="table__item table__item--score">
              <DropDownInput
                list={["1", "2", "3"]}
                callback={this.handleScoreInput}
              />
            </div>
            <div className="table__item table__item--submit">
              <Button
                text="Добавить оценку"
                modWidth="width-auto"
                modHeight="height-big"
                modStyle="empty"
                modColor="color-main"
                callback={this.addNewScore}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Scores;
