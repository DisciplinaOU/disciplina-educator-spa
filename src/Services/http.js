import type { IHttpService } from './types';
import axios, { AxiosStatic, AxiosInstance } from 'axios';

const BASE_URL = '/';

class HttpService implements IHttpService {
  httpService: AxiosInstance;
  
  constructor(axiosService: AxiosStatic) {
    this.httpService = new axiosService.create({
      baseURL: BASE_URL,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }
  
  _serializefilter(filter: {}): string {
    if (!filter) return '';
    const urlParams = Object.keys(filter).map(key => (
      filter[key] ? `${key}=${filter[key]}` : ''
    )).filter(Boolean).join('&');
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
