import axios, { AxiosStatic, AxiosInstance } from "axios";
import type { IHttpService } from "./types";

// const BASE_URL = 'https://stage-teachmeplease-aaa.stage.tchmpls.com';
const BASE_URL = "//192.168.1.108:7523";

class HttpService implements IHttpService {
  httpService: AxiosInstance;

  constructor(axiosService: AxiosStatic) {
    /*eslint new-cap: ["error", { "properties": false }]*/
    this.httpService = new axiosService.create({
      baseURL: BASE_URL,
      headers: { "Content-Type": "application/json", "tmp-csrf": "tmp-csrf" },
      withCredentials: true
    });

    this.httpService.interceptors.response.use(
      response => {
        if (response.data.token)
          localStorage.setItem("token", response.data.token);
        return response;
      },
      error => Promise.reject(error)
    );

    this.httpService.interceptors.request.use(
      config => {
        const token = localStorage.getItem("token");
        if (token) config.headers.authorization = token;
        return config;
      },
      error => Promise.reject(error)
    );
  }

  _serializefilter(filter: {}): string {
    if (!filter) return "";
    const urlParams = Object.keys(filter)
      .map(key => (filter[key] ? `${key}=${filter[key]}` : ""))
      .filter(Boolean)
      .join("&");
    return `?${urlParams}`;
  }

  get(url: string, filter?: *): Promise<*> {
    return this.httpService.get(`${url}${this._serializefilter(filter)}`);
  }

  post(url: string, data?: *): Promise<*> {
    return this.httpService.post(url, data);
  }
}

export default new HttpService(axios);
