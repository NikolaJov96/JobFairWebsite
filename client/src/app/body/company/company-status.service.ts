import { Injectable } from '@angular/core';
import { ConcourseEntity, ApiResponse, URL, ConcourseUsersEntity, CompanyConcoursesEntity } from 'src/app/interfaces';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyStatusService {

  com: CompanyConcoursesEntity;
  selectedCon: ConcourseUsersEntity;

  constructor(private http: HttpClient) { }

  setCom(com: CompanyConcoursesEntity) {
    this.com = com;
  }

  getCom(): CompanyConcoursesEntity {
    return this.com;
  }

  setSelectedCon(conId: ConcourseUsersEntity) {
    this.selectedCon = conId;
  }

  getSelectedCon(): ConcourseUsersEntity {
    return this.selectedCon;
  }

  getCons(): Subject<Array<ConcourseUsersEntity>> {
    const subject = new Subject<Array<ConcourseUsersEntity>>();
    const params = new HttpParams().append('comId', this.com._id);
    this.http.get(URL + '/concourses', { params: params }).subscribe((res: ApiResponse) => {
      if (res.status === 'success') {
        subject.next(res.data);
      } else {
        subject.next([]);
      }
    });
    return subject;
  }

  getCon(): Subject<ConcourseUsersEntity> {
    const subject = new Subject<ConcourseUsersEntity>();
    const params = new HttpParams().append('conId', this.selectedCon._id);
    this.http.get(URL + '/concourses', { params: params }).subscribe((res: ApiResponse) => {
      if (res.status === 'success') {
        subject.next(res.data);
      } else {
        subject.next(null);
      }
    });
    return subject;
  }

  createCon(con: ConcourseEntity): Subject<Array<string>> {
    const subject = new Subject<Array<string>>();
    con.host = this.com._id;
    this.http.post(URL + '/concourses', con).subscribe((res: ApiResponse) => {
      subject.next([res.status, res.message]);
    });
    return subject;
  }

  conclude(arr: Array<boolean>): Subject<Array<string>> {
    const subject = new Subject<Array<string>>();
    const body = {
      conId: this.selectedCon,
      arr: arr,
    };
    this.http.post(URL + '/conclude', body).subscribe((res: ApiResponse) => {
      subject.next([res.status, res.message]);
    });
    return subject;
  }

  getFair(): Subject<any> {
    const subject = new Subject<any>();
    this.http.get(URL + '/fair').subscribe((res: ApiResponse) => {
      if (res.status === 'success') {
        subject.next(res.data);
      } else {
        subject.next(null);
      }
    });
    return subject;
  }

  apply(data): Subject<Array<any>> {
    const subject = new Subject<Array<any>>();
    data.comId = this.com._id;
    data.additional = [];
    data.options.forEach((add, i) => {
      if (add) {
        data.additional.push(i);
      }
    });
    delete data.options;
    this.http.post(URL + '/com-apply', data).subscribe((res: ApiResponse) => {
      if (res.status === 'success') {
          subject.next([res.status, res.data]);
      } else {
        subject.next(['error']);
      }
    });
    return subject;
  }

}
