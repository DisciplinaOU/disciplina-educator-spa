import axios, { AxiosStatic, AxiosInstance } from "axios";
import base64url from "base64url";
import type { Certificate, FaircvListResponse, FaircvQuery, IFaircvService, NewCertificate } from "./types";

const API_URL = process.env.REACT_APP_EDUCATOR;
const BASE_URL = `${API_URL}/certificates`;
const DOWNLOAD = `${API_URL}/certificate`;
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
        // const token = localStorage.getItem("token");
        // if (token) config.headers.authorization = `Bearer eyJhbGciOiJFZERTQSIsImp3ayI6eyJjcnYiOiJFZDI1NTE5IiwieCI6IlI2Qlo3OGx5bHRVdEdBT012bFR4dG9ZeXRYS1E0OXQxSUNxb1EwQWtLWVUiLCJrdHkiOiJPS1AifX0.eyJwYXRoIjoiL2FwaS9lZHVjYXRvci92MS9jZXJ0aWZpY2F0ZXMiLCJ0aW1lIjoiMjAyNS0wMS0wMVQwMDowMDowMFoifQ.ifQScfwBi8EQunBpHkLg5eoDA2YYWvKcg1UepHisSGa4kh1yP0e4gbn-ZZufAmECyk4_x35uOmaJSn9mI92_Dw`;
        return config;
      },
      error => Promise.reject(error)
    );
  }

  getList(filter?: FaircvQuery): Promise<FaircvListResponse> {
    return this.httpService.get(`${BASE_URL}${this._serializefilter(filter)}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJFZERTQSIsImp3ayI6eyJjcnYiOiJFZDI1NTE5IiwieCI6IlI2Qlo3OGx5bHRVdEdBT012bFR4dG9ZeXRYS1E0OXQxSUNxb1EwQWtLWVUiLCJrdHkiOiJPS1AifX0.eyJwYXRoIjoiL2FwaS9lZHVjYXRvci92MS9jZXJ0aWZpY2F0ZXMiLCJ0aW1lIjoiMjAyNS0wMS0wMVQwMDowMDowMFoifQ.ifQScfwBi8EQunBpHkLg5eoDA2YYWvKcg1UepHisSGa4kh1yP0e4gbn-ZZufAmECyk4_x35uOmaJSn9mI92_Dw"
      }
    });
  }

  get(id: number): Promise<File> {
    const certId = this._makeCertId(id);
    return this.httpService.get(`${DOWNLOAD}${this._serializefilter({ id: certId })}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJFZERTQSIsImp3ayI6eyJjcnYiOiJFZDI1NTE5IiwieCI6IlI2Qlo3OGx5bHRVdEdBT012bFR4dG9ZeXRYS1E0OXQxSUNxb1EwQWtLWVUiLCJrdHkiOiJPS1AifX0.eyJwYXRoIjoiL2FwaS9lZHVjYXRvci92MS9jZXJ0aWZpY2F0ZSIsInRpbWUiOiIyMDI1LTAxLTAxVDAwOjAwOjAwWiJ9.7vja7dC0q2HcPHthSoDCwu4rW9Ioto3AU5R2eIKWuFm3HjkhGKNBjn06CXSG2LCj-Mo_kAD_gTS0od_GT5O8Bg"
      }
    });
  }

  create(cert: NewCertificate): Promise<Certificate> {
    return this.httpService.post(BASE_URL, cert);
  }

  _makeCertId(hash: string): string {
    const token = localStorage.getItem("token");
    if (token) {
      const baseEducatorData = token.split(".")[1];
      const decodedEducatorData = base64url.decode(baseEducatorData);
      const educator = JSON.parse(decodedEducatorData.toString());
      return base64url.encode(`${educator.data.id}:${hash}`);
    }
    return "";
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
