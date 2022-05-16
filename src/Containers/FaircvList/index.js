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
import { PageLoader } from "../../Common/Components/PageLoader";

type FaircvListState = {
  data: Array<Certificate>,
  currentPage: number,
  searchInput: string,
  isLoading: boolean,
  certificatesStates: {
    [key: string]: "idle" | "signing" | "downloading"
  },
  hasUnsignedCertificate: boolean
};

type FaircvListProps = {
  history: any
};

class FaircvList extends PureComponent<FaircvListProps, FaircvListState> {
  api: IFaircvService = FaircvService;

  state: FaircvListState = {
    isLoading: false,
    data: [],
    currentPage: -1,
    searchInput: "",
    certificatesStates: {},
    hasUnsignedCertificate: true
  };

  async componentDidMount() {
    this.startLoading();
    const data = await this.api.getList({
      sortBy: "desc(createdAt)"
    });

    const { items } = data.data;

    this.setState({
      data: items,
      currentPage: 1,
      hasUnsignedCertificate: items.some(row => row.certificate.txId === null)
    });

    this.stopLoading();
  }

  startLoading = () => this.setState({ isLoading: true });

  stopLoading = () => this.setState({ isLoading: false });

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
        (d: Certificate) =>
          d.certificate.meta.studentName.toLowerCase().indexOf(v.toLowerCase()) >= 0 ||
          d.certificate.meta.number.toString().indexOf(v) >= 0
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
    const token = localStorage.getItem("accessToken");
    if (token) {
      const baseEducatorData = token.split(".")[1];
      const decodedEducatorData = base64url.decode(baseEducatorData);
      const educator = JSON.parse(decodedEducatorData.toString());
      return base64url.encode(`${educator.data.publicAddress}:${hash}`);
    }
    return "";
  };

  verifyCert = async (certId: string) => {
    try {
      // eslint-disable-next-line react/destructuring-assignment
      const cert = this.state.data.find(row => row.certificate.id === certId);

      if (!cert) return;

      this.setState(state => ({
        certificatesStates: {
          ...state.certificatesStates,
          [certId]: "signing"
        }
      }));

      const txId = await FaircvService.verify({
        merkleRoot: cert.header.bodyProof.root,
        prevHash: cert.header.prevBlock,
        transactionsNum: cert.header.bodyProof.transactionsNum,
        headerHash: cert.headerHash
      });

      this.setState(state => ({
        certificatesStates: {
          ...state.certificatesStates,
          [certId]: "idle"
        },
        hasUnsignedCertificate: false,
        data: state.data.map(row =>
          row.certificate.id === certId ? { ...row, certificate: { ...row.certificate, txId } } : row
        )
      }));
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { currentPage, searchInput, data, isLoading, certificatesStates, hasUnsignedCertificate } = this.state;
    const isDesktop = window.innerWidth >= 768;
    const searchPlaceholder = isDesktop ? "Enter student name or diploma number" : "Search";
    const filteredArray = this.liveSearchArray(searchInput);
    const normalizedArray = [...filteredArray].splice((currentPage - 1) * 10, 10);
    const pages = Math.round(filteredArray.length / 10);

    const renderData = () =>
      data.length ? (
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
            {normalizedArray.map(({ certificate }: Certificate) => (
              <li className="list__item" key={certificate.id}>
                <div className="list__item-content">
                  <div className="list__item-name">{certificate.meta.studentName}</div>
                  <div className="list__item-degree">{certificate.meta.major}</div>
                  <div className="list__item-document">{`Diploma ${certificate.meta.number} issued ${certificate.meta.issueDate}`}</div>
                </div>

                <div className="list__buttons-group">
                  {certificate.txId === null ? (
                    <Button
                      text="Verify"
                      modWidth="width-auto"
                      modHeight="height-small"
                      modStyle="filled"
                      modColor="color-main"
                      loading={certificatesStates[certificate.id] === "signing"}
                      callback={() => this.verifyCert(certificate.id)}
                    />
                  ) : (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${process.env.REACT_APP_ETHERSCAN_BASE_URL}/tx/${certificate.txId}`}
                    >
                      <Button
                        text="Show transaction"
                        modWidth="width-auto"
                        modHeight="height-small"
                        modStyle="empty"
                        modColor="color-main"
                      />
                    </a>
                  )}
                  <Button
                    text="Download"
                    modWidth="width-auto"
                    modHeight="height-small"
                    modStyle="empty"
                    modColor="color-main"
                    callback={() => this.downloadPdf(certificate.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <MainMessage type="LIST_EMPTY" />
      );

    return (
      <div className="faircv-list container">
        <div className="faircv-list__title">
          <h1>Created FairCV</h1>
          <Button
            disabled={hasUnsignedCertificate}
            text="Add FairCV"
            modWidth="width-auto"
            modHeight="height-big"
            modStyle="filled"
            modColor="color-main"
            callback={this.createFairHandler}
          />
        </div>
        {isLoading ? <PageLoader /> : renderData()}
        {+pages > 1 ? (
          <Pagination goTo={this.goToPage} fwd={this.goFwd} bcwd={this.goBcwd} count={+pages} current={+currentPage} />
        ) : null}
      </div>
    );
  }
}
export default FaircvList;
