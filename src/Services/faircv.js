import axios, { AxiosStatic, AxiosInstance } from "axios";
import type { Certificate, FaircvListResponse, FaircvQuery, IFaircvService, NewCertificate } from "./types";

const API_URL = "http://educator.dev.net.disciplina.io/api/educator/v1";
const BASE_URL = `${API_URL}/certificates`;
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
        const token = localStorage.getItem("token");
        if (token) config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      error => Promise.reject(error)
    );
  }

  getList(filter?: FaircvQuery): Promise<FaircvListResponse> {
    return this.httpService.get(`${BASE_URL}${this._serializefilter(filter)}`);
  }

  get(id: number): Promise<File> {
    return this.httpService.get(`${BASE_URL}/${id}`);
  }

  create(cert: NewCertificate): Promise<Certificate> {
    return this.httpService.post(BASE_URL, cert);
  }

  _serializefilter(filter: {}): string {
    if (!filter) return "";
    const urlParams = Object.keys(filter)
      .map(key => (filter[key] ? `${key}=${filter[key]}` : ""))
      .filter(Boolean)
      .join("&");
    return `?${urlParams}`;
  }
}

export default new FaircvService(http);
