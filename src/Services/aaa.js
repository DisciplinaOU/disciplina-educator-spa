import type { IAAAService, IHttpService } from './types';
import HttpService from './http';

const BASE_URL = '/users';
const USER_CONFIRM = `${BASE_URL}/confirm`;
const USER_LOGIN = `${BASE_URL}/login`;
const CREATE_PASS = `${BASE_URL}/password`;
const RESET_PASSWORD = `${BASE_URL}/reset_password`;

class AAAService implements IAAAService {
  httpService: typeof HttpService;
  
  constructor(http: IHttpService) {
    this.httpService = http;
  }
  
  createUser(email: string, organization: string, website: string, password: string): Promise<*> {
    return this.httpService.post(BASE_URL, { ...arguments });
  }
  
  confirmUser(token: string): Promise<*> {
    return this.httpService.post(USER_CONFIRM, { token });
  }
  
  createPassword(password: string): Promise<*> {
    return this.httpService.post(CREATE_PASS, { password });
  }
  
  resetPassword(email: string): Promise<*> {
    return this.httpService(RESET_PASSWORD, { email });
  }
  
  login(email: string, password: string): Promise<*> {
    return this.httpService(USER_LOGIN, { ...arguments });
  }
  
}

export default new AAAService(HttpService);
