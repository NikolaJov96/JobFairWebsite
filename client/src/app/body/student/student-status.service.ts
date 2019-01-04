import { Injectable } from '@angular/core';
import { CompanyEntity, ConcourseEntity } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StudentStatusService {

  selectedCom: CompanyEntity;
  sekectedCon: ConcourseEntity;
  comToExpamd: CompanyEntity;
  workingIn: CompanyEntity;
  validCV: boolean;

  dummy = [
    {
      _id: 'asdf`134',
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
          _id: 'asdf234y',
          name: 'con1',
          jobType: 0,
          description: 'qwerasdfzxcv',
        },
        {
          _id: 'asdf2346',
          name: 'con2',
          jobType: 1,
          description: 'zxcvasdfqwer',
        },
      ],
    },
    {
      _id: 'sadfg3245yh',
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
          _id: 'asdf234',
          name: 'con1',
          jobType: 0,
          description: 'qwerasdfzxcv',
        },
        {
          _id: 'adgf4532',
          name: 'con2',
          jobType: 1,
          description: 'zxcvasdfqwer',
        },
      ],
    },
    {
      _id: 'swteh4523',
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
          _id: 'tyuk68432',
          name: 'con1',
          jobType: 0,
          description: 'qwerasdfzxcv',
        },
        {
          _id: 'aga243634',
          name: 'con2',
          jobType: 1,
          description: 'zxcvasdfqwer',
        },
      ],
    },
  ];

  constructor() {
    this.sekectedCon = null;
    this.comToExpamd = null;
    this.workingIn = this.dummy[0];
    this.validCV = false;
  }

  getComToExpand() {
    return this.comToExpamd;
  }

  setComToExpand(comToExpamd: CompanyEntity) {
    this.comToExpamd = comToExpamd;
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

  getWorikingIn(): CompanyEntity {
    return this.workingIn;
  }

  setWorkingIn(workingIn: CompanyEntity) {
    this.workingIn = workingIn;
  }

  getValidCV(): boolean {
    return this.validCV;
  }

  setValidCV(valid: boolean) {
    this.validCV = valid;
  }

  getCompanies(): Array<CompanyEntity> {
    return this.dummy;
  }

}
