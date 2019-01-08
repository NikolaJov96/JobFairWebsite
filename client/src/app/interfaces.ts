export interface ConcourseEntity {
  _id: string;
  name: string;
  description: string;
  toMin: string;
  toHour: string;
  toDate: Date;
  concluded: boolean;
  host: string;
  jobType: string;
  applicants: Array<{
    student: string,
    coverLetterExtension: string,
    accepted: boolean,
  }>;
}

export interface UserEntity {
  _id: string;
  username: string;
  password: string;
  email: string;
  type: string;
  stu: {
    firstName: string;
    lastName: string;
    phone: number;
    year: number;
    graduated: boolean;
    applications: string;
  };
  com: {
    name: string,
    city: string,
    director: string,
    taxNumber: string,
    employees: number,
    website: string,
    industry: string,
    field: string,
    concourses: Array<string>,
  };
  adm: {
    firstName: string;
    lastName: string;
    phone: number;
  };
}

export interface ConcourseUsersEntity {
  _id: string;
  name: string;
  description: string;
  toMin: string;
  toHour: string;
  toDate: Date;
  concluded: boolean;
  host: UserEntity;
  jobType: string;
  applicants: Array<{
    student: UserEntity,
    coverLetterExtension: string,
    accepted: boolean,
  }>;
}

export interface CompanyConcoursesEntity {
  _id: string;
  username: string;
  password: string;
  email: string;
  type: string;
  stu: any;
  com: {
    name: string,
    city: string,
    director: string,
    taxNumber: string,
    employees: number,
    website: string,
    industry: string,
    field: string,
    concourses: Array<ConcourseEntity>,
  };
  adm: any;
}

export interface Industry {
  _id: string;
  name: string;
}

export interface JobType {
  _id: string;
  name: string;
}

export const URL = 'http://localhost:4000';

export interface ApiResponse {
  status: string;
  message: string;
  data: any;
}
