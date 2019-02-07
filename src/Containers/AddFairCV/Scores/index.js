// @flow
import React, { PureComponent } from "react";
import "./styles.scss";
import { ScoreItem } from "./ScoreItem";

export type ScoresDataType = {
  subject: string,
  lang: string,
  hours: ?number,
  credits: ?number,
  grade: ?number
};

type ScoresProps = {
  dispatchScores: (data: Array<ScoresDataType>) => void
};

type ScoresState = {
  data: Array<ScoresDataType>
};

export class Scores extends PureComponent<ScoresProps, ScoresState> {
  state: ScoresState = {
    data: []
  };

  addNewScore = (scoreItem: ScoresDataType, scoreIndex?: number) => {
    const { dispatchScores } = this.props;
    const { data } = this.state;
    let updatedData;
    if (scoreIndex) {
      data[scoreIndex] = scoreItem;
      updatedData = data;
    } else {
      updatedData = [...data, scoreItem];
    }
    this.setState({ data: updatedData });
    dispatchScores(updatedData);
  };

  removeScore = (scoreIndex: number) => {
    const { dispatchScores } = this.props;
    this.setState(state => {
      const newData = [...state.data];
      newData.splice(scoreIndex, 1);
      dispatchScores(newData);
      return { data: newData };
    });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="scores">
        <h2 className="scores__title">Оценки</h2>
        <div className="scores__table table">
          <div className={`table__row table__row--head${data ? " active" : ""}`}>
            <div className="table__item table__item--course">Курс</div>
            <div className="table__item table__item--lang">Язык</div>
            <div className="table__item table__item--hours">Часов</div>
            <div className="table__item table__item--credits">ECTS credits</div>
            <div className="table__item table__item--score">Оценка</div>
            <div className="table__item table__item--button">&nbsp;</div>
            <div className="table__item table__item--button">&nbsp;</div>
          </div>
          {data.length
            ? data.map((item, index) => (
                <ScoreItem
                  scoreIndex={index}
                  isNewScore={false}
                  dispatchScore={this.addNewScore}
                  remove={this.removeScore}
                  scoreData={item}
                  key={item.subject}
                />
              ))
            : null}
          <ScoreItem isNewScore dispatchScore={this.addNewScore} remove={this.removeScore} />
        </div>
      </div>
    );
  }
}

export default Scores;
