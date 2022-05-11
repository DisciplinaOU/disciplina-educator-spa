// @flow
import React, { PureComponent } from "react";
import "./styles.scss";
import ScoreItem from "./ScoreItem";
import Modal from "../Modal";

export type ScoresDataType = {
  subject: string,
  lang: string,
  hours: ?number,
  credits: ?number,
  grade: ?string,
  scale?: string
};

type ScoresProps = {
  dispatchScores: (data: Array<ScoresDataType>) => void,
  isFormError: boolean
};

type ScoresState = {
  data: Array<ScoresDataType>,
  modal: {
    state: string,
    submit: () => void,
    cancel: () => void
  },
  isScoreItemError: boolean
};

const mockFn = () => { };

const clearModalState = {
  state: "",
  submit: () => mockFn(),
  cancel: () => mockFn()
};

const ScoresInitialState = {
  data: [],
  modal: clearModalState,
  isScoreItemError: false
};

export class Scores extends PureComponent<ScoresProps, ScoresState> {
  state: ScoresState = ScoresInitialState;

  addNewScore = (scoreItem: ScoresDataType, scoreIndex?: number) => {
    const { dispatchScores } = this.props;
    const { data } = this.state;
    let updatedData;
    if (scoreIndex || scoreIndex === 0) {
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
    this.setState(
      state => {
        const newData = [...state.data];
        newData.splice(scoreIndex, 1);
        dispatchScores(newData);
        return { data: newData };
      },
      () => this.closeModal()
    );
  };

  openScoreModal = (scoreIndex: number) => {
    this.setState({
      modal: {
        state: "DELETE",
        submit: () => this.removeScore(scoreIndex),
        cancel: () => this.closeModal()
      }
    });
  };

  closeModal = () => this.setState({ modal: clearModalState });

  render() {
    const { data, modal } = this.state;
    const { isFormError } = this.props;
    return (
      <>
        <div className="scores">
          <h2 className="scores__title">Grades</h2>
          <div className="scores__table table">
            <div className={`table__row table__row--head${data ? " active" : ""}`}>
              <div className="table__item table__item--course">Program</div>
              <div className="table__item table__item--lang">Language</div>
              <div className="table__item table__item--hours">Duration</div>
              <div className="table__item table__item--score">Grade</div>
              <div className="table__item table__item--button table__item--button-edit" />
              <div className="table__item table__item--button table__item--button-remove" />
            </div>
            {data.length
              ? data.map((item, index) => (
                <ScoreItem
                  scoreIndex={index}
                  isNewScore={false}
                  dispatchScore={this.addNewScore}
                  remove={this.openScoreModal}
                  scoreData={item}
                  key={item.subject}
                  isFormError={false}
                />
              ))
              : null}
            <ScoreItem
              isNewScore
              dispatchScore={this.addNewScore}
              remove={this.openScoreModal}
              isFormError={isFormError}
            />
          </div>
        </div>
        {modal.state.length ? <Modal modalContent={modal.state} submit={modal.submit} cancel={modal.cancel} /> : null}
      </>
    );
  }
}

export default Scores;
