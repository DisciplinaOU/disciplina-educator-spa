import axios, { AxiosStatic, AxiosInstance } from "axios";
import type { Certificate, FaircvListResponse, FaircvQuery, IFaircvService, NewCertificate } from "./types";

// const API_URL =
//   process.env.NODE_ENV === "production"
//     ? process.env.REACT_APP_EDUCATOR
//     : `http://${window.location.host}${process.env.REACT_APP_EDUCATOR}`;

const API_URL = process.env.REACT_APP_EDUCATOR;

const EDUCATOR_API = "/api/educator/v1";
const BASE_URL = `${API_URL}${EDUCATOR_API}`;
/*eslint new-cap: ["error", { "properties": false }]*/
const http = new axios.create({
  baseURL: BASE_URL,
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
    return this.httpService.get(`${BASE_URL}/certificates${this._serializefilter(filter)}`);
  }

  create(cert: NewCertificate): Promise<Certificate> {
    return this.httpService.post(`${BASE_URL}/certificate`, cert);
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
