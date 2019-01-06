import { Injectable } from '@angular/core';
import { ConcourseEntity, CompanyConcoursesEntity, ApiResponse } from 'src/app/interfaces';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentStatusService {

  selectedCom: CompanyConcoursesEntity;
  sekectedCon: ConcourseEntity;
  comToExpamd: CompanyConcoursesEntity;
  workingIn: CompanyConcoursesEntity;
  validCV: boolean;

  constructor(private http: HttpClient) {
    this.sekectedCon = null;
    this.comToExpamd = null;
    this.workingIn = null;
    this.validCV = false;
  }

  getComToExpand() {
    return this.comToExpamd;
  }

  setComToExpand(comToExpamd: CompanyConcoursesEntity) {
    this.comToExpamd = comToExpamd;
  }

  getCom(): CompanyConcoursesEntity {
    return this.selectedCom;
  }

  setCom(com: CompanyConcoursesEntity) {
    this.selectedCom = com;
  }

  getCon(): ConcourseEntity {
    return this.sekectedCon;
  }

  setCon(con: ConcourseEntity) {
    this.sekectedCon = con;
  }

  getWorikingIn(): CompanyConcoursesEntity {
    return this.workingIn;
  }

  setWorkingIn(workingIn: CompanyConcoursesEntity) {
    this.workingIn = workingIn;
  }

  getValidCV(): boolean {
    return this.validCV;
  }

  setValidCV(valid: boolean) {
    this.validCV = valid;
  }

  getCompanies(): Subject<Array<CompanyConcoursesEntity>> {
    const subject = new Subject<Array<CompanyConcoursesEntity>>();
    const params = new HttpParams().set('getCons', 'true');
    this.http.get(URL + '/companies', { params: params }).subscribe((res: ApiResponse) => {
      if (res.status === 'success') {
        subject.next(res.data);
      } else {
        subject.next([]);
      }
    });
    return subject;
  }

}
