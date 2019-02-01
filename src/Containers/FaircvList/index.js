// @flow
import React from 'react';
import './styles.scss';
import Button from '../../Common/Components/Button';
import fairCVListData from './fairCVListData';
import RegularInput from '../../Common/Components/RegularInput';

export const FaircvList = () => {
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
      {fairCVListData.length ?
        (
        <>
          <form className="faircv-list__search">
            <RegularInput placeholder="Введите имя студента или номер диплома" className="faircv-list__search-input" width="full"/>
            <Button
              text="Найти"
              modWidth="width-auto"
              modHeight="height-big"
              modStyle="filled"
              modColor="color-main"
            />
          </form>
          <ul className="list">
           { fairCVListData.map((item) =>
            <li className="list__item">
              <div className="list__item-content">
                <div className="list__item-name">{item.name}</div>
                <div className="list__item-degree">{item.degree}</div>
                <div className="list__item-document">{item.document}</div>
              </div>
              <Button
                text="Скачать"
                modWidth="width-auto"
                modHeight="height-small"
                modStyle="empty"
                modColor="color-main"
              />
            </li>
          )}
          </ul>
        </>
        )
      : null}
      {(fairCVListData.length >= 10 ) ?
        <ul className="pagination">
          <li className="pagination__item ">1</li>
          <li className="pagination__item">2</li>
          <li className="pagination__item active">33</li>
          <li className="pagination__item">Дальше</li>
        </ul>
      : null}
    </div>
  );
};
export default FaircvList;
