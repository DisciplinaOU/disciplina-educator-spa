// @flow
import React from 'react';
import Button from '../../../Common/Components/Button';
import './styles.scss';

export const Reminder = () => {
  return (
    <div className="reminder">
      <div className="reminder__text">
        <span></span>
        <p>Внимательно проверьте все данные перед сохранением. Изменить сохраненные записи будет невозможно!</p>
      </div>
      <Button
        text="Сохранить FairCV"
        modWidth="width-auto"
        modHeight="height-big"
        modStyle="filled"
        modColor="color-main"
        callback={()=>{}}
      />
    </div>
  );
};
export default Reminder;
