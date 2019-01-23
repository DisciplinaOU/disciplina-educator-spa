import type {
  Certificate,
  FaircvListResponse,
  FaircvQuery,
  IFaircvService,
  IHttpService,
  NewCertificate
} from './types';
import HttpService from './http';

const BASE_URL = '/certificates';

class FaircvService implements IFaircvService {
  httpService: typeof HttpService;
  
  constructor(http: IHttpService) {
    this.httpService = http;
  }
  
  getList(filter?: FaircvQuery): Promise<FaircvListResponse> {
    return this.httpService.get(BASE_URL, filter);
  }
  
  get(id: number): Promise<File> {
    return this.httpService.get(`${BASE_URL}/${id}`);
  }
  
  create(cert: NewCertificate): Promise<Certificate> {
    return this.httpService.post(BASE_URL, cert);
  }
}

export default new FaircvService(HttpService);
