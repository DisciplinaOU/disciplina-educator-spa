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
  pages: number,
  currentPage: number
};

type FaircvListProps = {
  history: any
};

class FaircvList extends PureComponent<FaircvListProps, FaircvListState> {
  api: IFaircvService = FaircvService;

  state: FaircvListState = {
    data: [],
    pages: 0,
    currentPage: -1
  };

  async componentDidMount() {
    const data = await this.api.getList();
    const { items, count } = data.data;
    this.setState({
      data: items,
      pages: Math.round(count / 10),
      currentPage: 1
    });
  }

  createFairHandler = () => {
    const { history } = this.props;
    history.push("/faircv/create");
  };

  goToPage = (p: number) => this.setState({ currentPage: p });

  goFwd = () => {
    this.setState(s => {
      if (s.currentPage === s.pages) return null;
      return { currentPage: s.currentPage + 1 };
    });
  };

  goBcwd = () => {
    this.setState(s => {
      if (s.currentPage === 1) return null;
      return { currentPage: s.currentPage - 1 };
    });
  };

  render() {
    const { data, pages, currentPage } = this.state;
    const isDesktop = document.documentElement && document.documentElement.clientWidth >= 768;
    const searchPlaceholder = isDesktop ? "Введите имя студента или номер диплома" : "Поиск";
    const normalizedArray = [...data].splice((currentPage - 1) * 10, 10);
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
            callback={this.createFairHandler}
          />
        </div>
        {normalizedArray.length ? (
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
              {normalizedArray.map((item: Certificate) => (
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
