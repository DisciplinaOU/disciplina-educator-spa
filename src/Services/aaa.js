import type { Educator, IAAAService, IHttpService } from './types';
import HttpService from './http';

const BASE_URL = '/educators';
const USER_CONFIRM = `${BASE_URL}/current`;
const USER_LOGIN = '/educator_session';
const CREATE_PASS = `${BASE_URL}/password`;
const RESET_PASSWORD = `${BASE_URL}/send_reset_instructions`;

class AAAService implements IAAAService {
  httpService: typeof HttpService;
  
  constructor(http: IHttpService) {
    this.httpService = http;
  }
  
  createUser(email: string, name: string, website: string, password: string): Promise<Educator> {
    return this.httpService.post(BASE_URL, { ...arguments });
  }
  
  getCurrentUser(): Promise<Educator> {
    return Promise.resolve({id: 1, isConfirmed: true });
    // return this.httpService.get(USER_CONFIRM);
  }
  
  createPassword(password: string, resetPasswordToken: string): Promise<*> {
    return this.httpService.post(CREATE_PASS, { password, resetPasswordToken });
  }
  
  resetPassword(email: string): Promise<*> {
    return this.httpService(RESET_PASSWORD, { email });
  }
  
  login(email: string, password: string): Promise<*> {
    return this.httpService(USER_LOGIN, { ...arguments });
  }
  
}

export default new AAAService(HttpService);
