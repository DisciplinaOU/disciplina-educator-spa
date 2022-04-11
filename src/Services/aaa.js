import axios, { AxiosStatic, AxiosInstance } from "axios";
import type { Educator, IAAAService } from "./types";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_AAA
    : `http://${window.location.host}${process.env.REACT_APP_AAA}`;

const BASE_URL = `${API_URL}/educators`;
const USER_CURRENT = `${BASE_URL}/current`;
const USER_LOGIN = "/educator_session";
const CREATE_PASS = `${BASE_URL}/password`;
const RESET_PASSWORD = `${BASE_URL}/send_reset_instructions`;

/*eslint new-cap: ["error", { "properties": false }]*/
const http = new axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "tmp-csrf": "tmp-csrf",
    mode: "no-cors"
  }
});

class AAAService implements IAAAService {
  httpService: AxiosInstance;

  constructor(httpInstance: AxiosStatic) {
    this.httpService = httpInstance;

    this.httpService.interceptors.response.use(
      response => {
        if (response.data.token) localStorage.setItem("token", response.data.token);
        return response;
      },
      error => Promise.reject(error.response.data)
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

  createUser(email: string, name: string, website: string, password: string): Promise<Educator> {
    return this.httpService.post(BASE_URL, { email, name, website, password });
  }

  getCurrentUser(): Promise<Educator> {
    return this.httpService.get(USER_CURRENT);
  }

  createPassword(password: string, resetPasswordToken: string): Promise<*> {
    return this.httpService.post(CREATE_PASS, { password, resetPasswordToken });
  }

  resetPassword(email: string): Promise<*> {
    return this.httpService.post(RESET_PASSWORD, { email });
  }

  login(email: string, password: string): Promise<*> {
    return this.httpService.post(USER_LOGIN, { email, password });
  }

  logout(): void {
    localStorage.removeItem("token");
    window.location.pathname = "/";
  }
}

export default new AAAService(http);
