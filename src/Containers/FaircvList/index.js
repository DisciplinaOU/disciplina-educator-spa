// @flow
import React, { PureComponent } from "react";
import "./styles.scss";
import Button from "../../Common/Components/Button";
import RegularInput from "../../Common/Components/RegularInput";
import Pagination from "../../Common/Components/Pagination";
import FaircvService from "../../Services/faircv";
import type { Certificate, IFaircvService } from "../../Services/types";

type FairCVListDataType = {
  id: number,
  name: string,
  degree: string,
  document: string
};

type FaircvListState = {
  data: Array<FairCVListDataType>,
  totalCount: number,
  pages: number,
  currentPage: number
};

class FaircvList extends PureComponent<{}, FaircvListState> {
  api: IFaircvService = FaircvService;

  state: FaircvListState = {
    data: [],
    totalCount: 0,
    pages: 0,
    currentPage: -1
  };

  async componentDidMount() {
    const data = await this.api.getList();
    this.setState({
      data: data.data.items,
      totalCount: data.data.count,
      pages: Math.round(data.data.count / 10),
      currentPage: 1
    });
  }
  
  goToPage = (p: number) => this.setState({ currentPage: p });
  
  goFwd = () => {
    this.setState(s => {
      if (s.currentPage === s.pages) return null;
      return { currentPage: s.currentPage++ };
    });
  };
  
  goBcwd = () => {
    this.setState(s => {
      if (s.currentPage === 1) return null;
      return { currentPage: s.currentPage-- };
    });
  };

  render() {
    const { data, pages, currentPage } = this.state;
    const isDesktop = document.documentElement && document.documentElement.clientWidth >= 768;
    const searchPlaceholder = isDesktop ? "Введите имя студента или номер диплома" : "Поиск";
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
                placeholder={searchPlaceholder}
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
              {data.map((item: Certificate) => (
                <li className="list__item" key={item.id}>
                  <div className="list__item-content">
                    <div className="list__item-name">{item.meta.studentName}</div>
                    <div className="list__item-degree">{item.meta.major}</div>
                    <div className="list__item-document">
                      {`Диплом ${item.meta.number} выдан ${item.meta.issueDate}`}
                    </div>
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
        <Pagination goTo={this.goToPage} fwd={this.goFwd} bcwd={this.goBcwd} count={+pages} current={+currentPage} />
      </div>
    );
  }
}
export default FaircvList;
