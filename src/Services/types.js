// Base
export interface IHttpService {
  get(url: string, filter?: any): Promise<any>;
  post(url: string, data?: any): Promise<any>;
  patch(url: string, data?: any): Promise<any>;
}

// FairCv
type Order = "asc" | "desc";

type EducationForm = "fulltime" | "parttime";

type Language = "en" | "ru";

type GradingScale = "rusDiff" | "rusNonDiff";

export type Educator = {
  id?: number,
  username?: string,
  nonce?: number,
  publicAddress: string
};

export type FaircvQuery = {
  offset: number,
  limit: number,
  order: Order,
  onlyCount: boolean
};

export type Certificate = {
  id?: string,
  meta: {
    studentName: string,
    studentBirthDate: string,
    startYear: number,
    endYear: number,
    educationForm: EducationForm,
    number: string,
    issueDate: string,
    title: string,
    major: string,
    specialization: string
  }
};

export type Grades = {
  subject: string,
  lan: Language,
  hours: number,
  credits: number,
  scale: GradingScale,
  grade: number
};

export type FaircvListResponse = {
  count: number,
  certificates: Certificate[]
};

export type NewCertificate = Certificate & Grades[];

export interface IFaircvService {
  httpService: IHttpService;
  getList(filter?: FaircvQuery): Promise<FaircvListResponse>;
  create(cert: NewCertificate): Promise<Certificate>;
  get(id: number): Promise<File>;
}

// AAA
// TODO return types must be updated when api spec will be ready
export interface IAAAService {
  httpService: IHttpService;
  findUser(publicAddress: string): Promise<[Educator]>;
  createUser(publicAddress: string): Promise<Educator>;
  login(publicAddress: string, signature: string): Promise<any>;
  getCurrentUser(): Promise<Educator>;
  setUsername(username: string): Promise<Educator>;
  logout(): void;
}

export interface SubmitCertificate {
  blockHash: string;
  txId: string;
}
