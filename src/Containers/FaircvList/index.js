// @flow
import React from "react";
import "./styles.scss";
import Button from "../../Common/Components/Button";
import FairCVListData from "./fairCVListData";
import RegularInput from "../../Common/Components/RegularInput";
import Pagination from "../../Common/Components/Pagination";

type FairCVListDataType = {
  id: number,
  name: string,
  degree: string,
  document: string
};

export const FaircvList = () => {
  const data = (FairCVListData: Array<FairCVListDataType>);

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
          callback={() => {}}
        />
      </div>
      {data.length ? (
        <>
          <form className="faircv-list__search">
            <RegularInput
              value=""
              placeholder="Введите имя студента или номер диплома"
              className="faircv-list__search-input"
              width="full-width"
              dispatchValue={() => {}}
            />
            <Button
              text="Найти"
              modWidth="width-auto"
              modHeight="height-big"
              modStyle="filled"
              modColor="color-main"
              callback={() => {}}
            />
          </form>
          <ul className="list">
            {data.map(item => (
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
                  callback={() => {}}
                />
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {FairCVListData.length >= 10 ? <Pagination /> : null}
    </div>
  );
};
export default FaircvList;
