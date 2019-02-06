import type { Educator, IAAAService, IHttpService } from "./types";
import HttpService from "./http";

const BASE_URL = "/educators";
const USER_CURRENT = `${BASE_URL}/current`;
const USER_LOGIN = "/educator_session";
const CREATE_PASS = `${BASE_URL}/password`;
const RESET_PASSWORD = `${BASE_URL}/send_reset_instructions`;

class AAAService implements IAAAService {
  httpService: typeof HttpService;

  constructor(http: IHttpService) {
    this.httpService = http;
  }

  createUser(email: string, name: string, website: string, password: string): Promise<Educator> {
    return this.httpService.post(BASE_URL, { email, name, website, password });
  }

  getCurrentUser(): Promise<Educator> {
    // return Promise.resolve({id: 1, isConfirmed: true, isOrganizationConfirmed: true });
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

export default new AAAService(HttpService);
