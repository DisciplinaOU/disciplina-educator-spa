// @flow
import React, { PureComponent } from "react";
import base64url from "base64url";
import "./styles.scss";
import Button from "../../Common/Components/Button";
import RegularInput from "../../Common/Components/RegularInput";
import Pagination from "../../Common/Components/Pagination";
import FaircvService from "../../Services/faircv";
import type { Certificate, IFaircvService } from "../../Services/types";
import MainMessage from "../../Common/Components/MainMessage";

type FaircvListState = {
  data: Array<Certificate>,
  currentPage: number,
  searchInput: string
};

type FaircvListProps = {
  history: any
};

class FaircvList extends PureComponent<FaircvListProps, FaircvListState> {
  api: IFaircvService = FaircvService;

  state: FaircvListState = {
    data: [],
    currentPage: -1,
    searchInput: ""
  };

  async componentDidMount() {
    const data = await this.api.getList();
    const { items } = data.data;
    this.setState({
      data: items,
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
      return { currentPage: s.currentPage + 1 };
    });
  };

  goBcwd = () => {
    this.setState(s => {
      return { currentPage: s.currentPage - 1 };
    });
  };

  searchInputHandler = (v: string) => {
    this.setState({
      searchInput: v,
      currentPage: 1
    });
  };

  liveSearchArray = (v: string): Array<Certificate> => {
    const { data } = this.state;
    const arr: Array<Certificate> = [...data];
    if (v.length) {
      return arr.filter(
        (d: Certificate) => d.meta.studentName.indexOf(v) >= 0 || d.meta.number.toString().indexOf(v) >= 0
      );
    }
    return arr;
  };

  downloadPdf = async (id: string) => {
    const downloadLink = document.createElement("a");
    downloadLink.target = "_blank";
    downloadLink.download = "certificate.pdf";

    const API_URL = process.env.REACT_APP_EDUCATOR || "";
    const downloadUrl = `${API_URL}/api/certificates/v1/cert/${this.makeCertId(id)}.pdf`;

    downloadLink.href = downloadUrl;
    if (document.body) {
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }
  };

  makeCertId = (hash: string): string => {
    const token = localStorage.getItem("token");
    if (token) {
      const baseEducatorData = token.split(".")[1];
      const decodedEducatorData = base64url.decode(baseEducatorData);
      const educator = JSON.parse(decodedEducatorData.toString());
      return base64url.encode(`${educator.data.id}:${hash}`);
    }
    return "";
  };

  render() {
    const { currentPage, searchInput, data } = this.state;
    const isDesktop = document.documentElement && document.documentElement.clientWidth >= 768;
    const searchPlaceholder = isDesktop ? "Введите имя студента или номер диплома" : "Поиск";
    const filteredArray = this.liveSearchArray(searchInput);
    const normalizedArray = [...filteredArray].splice((currentPage - 1) * 10, 10);
    const pages = Math.round(filteredArray.length / 10);
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
        {data.length ? (
          <>
            <form className="faircv-list__search">
              <RegularInput
                value={searchInput}
                placeholder={searchPlaceholder}
                className="faircv-list__search-input"
                width="full-width"
                dispatchValue={this.searchInputHandler}
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
                    callback={() => this.downloadPdf(item.id)}
                  />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <MainMessage type="LIST_EMPTY" />
        )}
        <Pagination goTo={this.goToPage} fwd={this.goFwd} bcwd={this.goBcwd} count={+pages} current={+currentPage} />
      </div>
    );
  }
}
export default FaircvList;
