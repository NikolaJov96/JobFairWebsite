import { Injectable } from '@angular/core';

export interface ConcourseEntity {
  id: number;
  name: string;
  jobType: number;
  description: string;
}

export interface CompanyEntity {
  id: number;
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

@Injectable({
  providedIn: 'root'
})
export class StudentStatusService {

  selectedCom: CompanyEntity;
  sekectedCon: ConcourseEntity;
  validCV: boolean;

  constructor() {
    this.sekectedCon = null;
    this.validCV = false;
  }

  getCom(): CompanyEntity {
    return this.selectedCom;
  }

  setCom(com: CompanyEntity) {
    this.selectedCom = com;
  }

  getCon(): ConcourseEntity {
    return this.sekectedCon;
  }

  setCon(con: ConcourseEntity) {
    this.sekectedCon = con;
  }

  getValidCV(): boolean {
    return this.validCV;
  }

  setValidCV(valid: boolean) {
    this.validCV = valid;
  }

  getCompanies(): Array<CompanyEntity> {
    return [
      {
        id: 0,
        name: 'Com1',
        town: 'Tow1',
        director: 'Dir1',
        taxNumber: '1234',
        staff: '123',
        email: 'hi@com1.com',
        website: 'www.com1.com',
        industry: 0,
        concourses: [
          {
            id: 0,
            name: 'con1',
            jobType: 0,
            description: 'qwerasdfzxcv',
          },
          {
            id: 1,
            name: 'con2',
            jobType: 1,
            description: 'zxcvasdfqwer',
          },
        ],
      },
      {
        id: 1,
        name: 'Com2',
        town: 'Tow2',
        director: 'Dir2',
        taxNumber: '2345',
        staff: '234',
        email: 'hi@com2.com',
        website: 'www.com2.com',
        industry: 1,
        concourses: [
          {
            id: 0,
            name: 'con1',
            jobType: 0,
            description: 'qwerasdfzxcv',
          },
          {
            id: 1,
            name: 'con2',
            jobType: 1,
            description: 'zxcvasdfqwer',
          },
        ],
      },
      {
        id: 2,
        name: 'Com3',
        town: 'Tow3',
        director: 'Dir3',
        taxNumber: '3456',
        staff: '345',
        email: 'hi@com3.com',
        website: 'www.com3.com',
        industry: 3,
        concourses: [
          {
            id: 0,
            name: 'con1',
            jobType: 0,
            description: 'qwerasdfzxcv',
          },
          {
            id: 1,
            name: 'con2',
            jobType: 1,
            description: 'zxcvasdfqwer',
          },
        ],
      },
    ];
  }

}
