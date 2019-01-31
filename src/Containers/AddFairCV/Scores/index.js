// @flow
import React, { PureComponent } from 'react';
import RegularInput from '../../../Common/Components/RegularInput';
import DropDownInput from '../../../Common/Components/DropDownInput';
import Button from '../../../Common/Components/Button';
import './styles.scss';

type ScoresProps = {
  data: Array<any>
}

export class Scores extends PureComponent<ScoresProps, {}> {

  render() {
    const { data } = this.props;

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
            <div className="table__item table__item--button"></div>
            <div className="table__item table__item--button"></div>
          </div>
          {data ?
            ( data.map((i) =>
              <div className="table__row" key={i.id}>
                <div className="table__item table__item--course">{i.course}</div>
                <div className="table__item table__item--lang">{i.language}</div>
                <div className="table__item table__item--hours">{i.hours}</div>
                <div className="table__item table__item--credits">{i.ectscredits}</div>
                <div className="table__item table__item--score">{i.score}</div>
                <div className="table__item table__item--button"><span className="btn btn--edit"></span></div>
                <div className="table__item table__item--button"><span className="btn btn--del"></span></div>
              </div>
            )): null}
          <div className="table__row table__form">
            <div className="table__item table__item--course"><RegularInput /></div>
            <div className="table__item table__item--lang"><DropDownInput list={[1,2,3]} /></div>
            <div className="table__item table__item--hours"><RegularInput /></div>
            <div className="table__item table__item--credits"><RegularInput /></div>
            <div className="table__item table__item--score"><DropDownInput list={[1,2,3]} /></div>
            <div className="table__item table__item--submit">
              <Button
                text="Добавить оценку"
                modWidth="width-auto"
                modHeight="height-big"
                modStyle="empty"
                modColor="color-main"
                callback={()=>{}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Scores;
