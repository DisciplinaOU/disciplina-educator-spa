// Base
export interface IHttpService {
  get(url: string, filter?: any): Promise<any>,
  post(url: string, data?: any): Promise<any>
}

// FairCv
type Order = 'asc' | 'desc';

type EducationForm = 'fulltime' | 'parttime';

type Language = 'en' | 'ru';

export type FaircvQuery = {
  offset: number,
  limit: number,
  order: Order,
  onlyCount: boolean
}

export type Certificate = {
  id?: string,
  meta: {
    student: {
      name: string,
      birthDate: string
    },
    startYear: number,
    endYear: number,
    educationForm: EducationForm,
    number: string,
    issueDate: string,
    title: string,
    major: string,
    specialization: string
  }
}

export type Grades = {
  subject:	string,
  lan: Language,
  hours:	number,
  credits:	number,
  grade: number
}

export type FaircvListResponse = {
  count: number,
  certificates: Certificate[]
};

export type NewCertificate = Certificate & Grades[]

export interface IFaircvService {
  getList(filter? : FaircvQuery): Promise<FaircvListResponse>,
  create(cert: NewCertificate): Promise<Certificate>,
  get(id: number): Promise<File>
}
