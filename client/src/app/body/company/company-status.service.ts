import { Injectable } from '@angular/core';
import { CompanyEntity, ConcourseEntity, StudentEntity } from 'src/app/interfaces';

export interface ConcourseConc {
  con: ConcourseEntity;
  applicants: Array<{ stud: StudentEntity, acc: boolean }>;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyStatusService {

  comId: string;
  selectedConId: ConcourseConc;

  constructor() { }

  setCom(com: string) {
    this.comId = com;
  }

  getCom(): string {
    return this.comId;
  }

  setSelectedCon(conId: ConcourseConc) {
    this.selectedConId = conId;
  }

  getSelectedCon(): ConcourseConc {
    return this.selectedConId;
  }

  getFinishedCons(): Array<ConcourseConc> {
    return [
      {
        con: { _id: 'asdq23', description: 'asadfasdfasdf', name: 'adsf', jobType: 0 },
        applicants: [
          {
            stud: { name: 'qwe', _id: 'af232rtw' },
            acc: false,
          },
          {
            stud: { name: 'drftjh', _id: 'azdrfgswf3' },
            acc: false,
          },
          {
            stud: { name: 'asd', _id: 'dsarfgse4s34e' },
            acc: false,
          },
        ],
      },
      {
        con: { _id: 'farge3', description: 'asdgfdgjgtfkuhiljio;o;gjfdtxhdrt', name: 'fgdhfd', jobType: 1 },
        applicants: [
          {
            stud: { name: 'qwe', _id: 'af232rtw' },
            acc: false,
          },
          {
            stud: { name: 'drftjh', _id: 'azdrfgswf3' },
            acc: false,
          },
          {
            stud: { name: 'asd', _id: 'dsarfgse4s34e' },
            acc: false,
          },
        ],
      },
    ];
  }

}
