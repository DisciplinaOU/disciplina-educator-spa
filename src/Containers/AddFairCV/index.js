// @flow
import React, { PureComponent } from 'react';
import './styles.scss';
import Button from '../../Common/Components/Button';
import RegularInput from '../../Common/Components/RegularInput';
import DropDownInput from '../../Common/Components/DropDownInput';
import DatePicker from 'react-datepicker';
import Scores from './Scores';
import Reminder from '../../Common/Components/Reminder';
import Modal from '../../Common/Components/Modal';
import 'react-datepicker/dist/react-datepicker.css';
import scoresData from './scoresData';

type AddFairCVState = {
  startDate: typeof Date
}

export class AddFairCV extends PureComponent <{}, AddFairCVState> {
  state = {
    startDate: new Date(),
    scoresData: scoresData,
    modalContent:
    <>
      <div className="modal__title">FairCV создано</div>
      <div className="modal__reminder reminder">
        <div className="reminder__text">
          <span></span>
          <p>Первые несколько минут после создания новое FairCV может не проходить валидацию. Это связано с задержкой появления информации в блокчейне.</p>
        </div>
        <Button
          text="Скачать PDF"
          modWidth="width-auto"
          modHeight="height-big"
          modStyle="filled"
          modColor="color-main"
          callback={()=>{}}
        />
        <Button
          text="Закрыть и вернуться к списку"
          modWidth="width-auto"
          modHeight="height-big"
          modStyle="empty"
          modColor="color-main"
          callback={()=>{}}
        />
      </div>
    </>
  };

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <div className="add-form">
        <Modal content={this.state.modalContent} />
        <div className="container">
          <div className="navigation-link text-left">
            <Button
              text="Вернуться к списку"
              modWidth="width-auto"
              modHeight="height-big"
              modStyle="arrow-back"
              modColor="color-main"
            />
          </div>
          <h1 className="add-form__title">Добавление FairCV</h1>
          <form>
            <div className="add-form__item input-container">
              <h2 className="input-container__title text-left">Студент</h2>
              <div className="input-group">
                <RegularInput title="Фамилия, имя, отчество" className="input-sudent" width="full"/>
                <div className="input data-input">
                  <label className="data-input__label">Дата рождения</label>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="add-form__item input-container">
              <h2 className="input-container__title text-left">Обучение</h2>
              <div className="input-group">
                <DropDownInput
                  list={[1,2,3]}
                  title="Год поступления"
                  className="input-education-start"
                />
                <DropDownInput
                  list={[1,2,3]}
                  title="Год окончания"
                  className="input-education-end"
                />
                <DropDownInput
                  list={[1,2,3]}
                  title="Форма обучения"
                  className="input-education-form"
                />
              </div>
            </div>
            <div className="add-form__item input-container">
              <h2 className="input-container__title text-left">Диплом</h2>
              <div className="input-group">
                <RegularInput
                  title="Номер"
                  className="input-number"
                  width="full"
                />
                <div className="input data-input">
                  <label className="data-input__label">Дата выдачи</label>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <RegularInput
                title="Присвоено звание"
                width="full"
                className="input-rank"
              />
              <RegularInput
                title="Специальность" width="full"
                className="input-speciality"
              />
              <RegularInput
                title="Специализация (если есть)"
                width="full"
                className="input-specialization"
              />
            </div>
            <Scores data={scoresData}/>
          </form>
        </div>
        <Reminder className="container"/>
      </div>
    );
  }
}

export default AddFairCV
