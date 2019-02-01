// @flow
import React, { PureComponent } from 'react';
import './styles.scss';
import Button from '../../Common/Components/Button'


class FaircvList extends PureComponent <FaircvListProps, FaircvListState> {
  render() {
    return (
      <div className="faircv-list container">
        <div className="faircv-list__title">
          <h1>Созданные FairCV</h1>
          <Button
            text="Добавить FairCV"
            modWidth="width-auto"
            modHeight="height-big"
            modStyle="filled"
            modColor="color-main"
          />
        </div>
        <div className="list">
          <form className="list__search">
            <input type="text" />
            <Button
              text="Найти"
              modWidth="width-auto"
              modHeight="height-big"
              modStyle="filled"
              modColor="color-main"
            />
          </form>
          <ul>
            <li>
              <div>Человек</div>
              <div>Магистр</div>
              <div>Диплом</div>
              <Button
                text="Скачать"
                modWidth="width-auto"
                modHeight="height-small"
                modStyle="empty"
                modColor="color-main"
              />
            </li>
          </ul>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>Дальше</li>
          </ul>
        </div>
      </div>
    );
  }
};
export default FaircvList;
