import axios, { AxiosStatic, AxiosInstance } from "axios";
import type { Educator, IAAAService } from "./types";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_AAA
    : `http://${window.location.host}${process.env.REACT_APP_AAA}`;
// const API_URL = process.env.REACT_APP_AAA;
const BASE_URL = `${API_URL}/api`;

/*eslint new-cap: ["error", { "properties": false }]*/
const http = new axios.create({
  baseURL: BASE_URL,
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
  }

  findUser(publicAddress: string): Promise<[Educator]> {
    return this.httpService
      .get("/users", {
        params: { publicAddress }
      })
      .then(res => res.data);
  }

  createUser(publicAddress: string): Promise<Educator> {
    return this.httpService.post("/users", { publicAddress }).then(res => res.data);
  }

  getCurrentUser(): Promise<Educator> {
    const accessToken: string = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw Error("Attempt to access authenticated route before login");
    }

    return this.httpService
      .get("/users/current", {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res => res.data);
  }

  setUsername(username: string): Promise<Educator> {
    const accessToken: string = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw Error("Attempt to access authenticated route before login");
    }

    return this.httpService
      .patch("/users/current", { username }, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => res.data);
  }

  login(publicAddress: string, signature: string): Promise<*> {
    return this.httpService.post("/auth", { publicAddress, signature }).then(res => res.data);
  }
}

export default new AAAService(http);
