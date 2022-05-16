import axios, { AxiosStatic, AxiosInstance } from "axios";
import { Web3 } from "../libs/web3/core";
import { contractX } from "../SmartContracts";
import type {
  Certificate,
  FaircvListResponse,
  FaircvQuery,
  IFaircvService,
  NewCertificate,
  SubmitCertificate,
  VerifyCertificate
} from "./types";

const SERVICE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_EDUCATOR
    : `http://${window.location.host}${process.env.REACT_APP_EDUCATOR}`;

/*eslint new-cap: ["error", { "properties": false }]*/
const http = new axios.create({
  baseURL: `${SERVICE_URL}/api/educator/v1`,
  headers: {
    "Content-Type": "application/json"
  }
});

class FaircvService implements IFaircvService {
  httpService: AxiosInstance;

  constructor(httpInstance: AxiosStatic) {
    this.httpService = httpInstance;

    this.httpService.interceptors.request.use(
      config => {
        const token = localStorage.getItem("accessToken");
        if (token) config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      error => Promise.reject(error)
    );
  }

  getList(filter?: FaircvQuery): Promise<FaircvListResponse> {
    return this.httpService.get(`/certificates${this._serializefilter(filter)}`);
  }

  create(cert: NewCertificate): Promise<Certificate> {
    return this.httpService.post("/certificate", cert);
  }

  update(cert: SubmitCertificate): Promise<Certificate> {
    return this.httpService.put("/certificate", cert);
  }

  async verify({ merkleRoot, prevHash, transactionsNum, headerHash }: VerifyCertificate): Promise<string> {
    const merkleRootBytes32 = `0x${merkleRoot}`;
    const prevHashBytes32 = `0x${prevHash}`;
    const prevHashCur = await contractX.prevHashCur(Web3.state.defaultAccount);
    const hasPrevHashCur = Number(prevHashCur) !== 0;

    const method = hasPrevHashCur ? "submitHeader" : "startChain";

    const tx = await contractX[method](prevHashBytes32, merkleRootBytes32, transactionsNum);

    await this.httpService.put("/certificate", {
      txId: tx.hash,
      blockHash: headerHash
    });

    return tx.hash;
  }

  _serializefilter(filter: {}): string {
    if (!filter) return "";
    const urlParams = Object.keys(filter)
      .map(key =>
        Object.prototype.hasOwnProperty.call(filter, key)
          ? `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`
          : ""
      )
      .filter(Boolean)
      .join("&");
    return `?${urlParams}`;
  }
}

export default new FaircvService(http);
