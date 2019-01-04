export interface ConcourseEntity {
  _id: string;
  name: string;
  jobType: number;
  description: string;
}

export interface CompanyEntity {
  _id: string;
  name: string;
  town: string;
  director: string;
  taxNumber: string;
  staff: string;
  email: string;
  website: string;
  industry: number;
  concourses: Array<ConcourseEntity>;
}

export interface Industry {
  value: number;
  name: string;
}

export interface JobType {
  value: number;
  name: string;
}
