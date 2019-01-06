import { Injectable } from '@angular/core';
import { ConcourseEntity, ApiResponse, URL } from 'src/app/interfaces';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyStatusService {

  comId: string;
  selectedConId: string;

  constructor(private http: HttpClient) { }

  setCom(com: string) {
    this.comId = com;
  }

  getCom(): string {
    return this.comId;
  }

  setSelectedCon(conId: string) {
    this.selectedConId = conId;
  }

  getSelectedCon(): string {
    return this.selectedConId;
  }

  getCons(): Subject<Array<ConcourseEntity>> {
    const subject = new Subject<Array<ConcourseEntity>>();
    const params = new HttpParams().set('getApplicants', 'true').append('comId', this.comId);
    this.http.get(URL + '/concourses', { params: params }).subscribe((res: ApiResponse) => {
      if (res.status === 'success') {
        subject.next(res.data);
      } else {
        subject.next([]);
      }
    });
    return subject;
  }

  createCon(con: ConcourseEntity) {
    const subject = new Subject<Array<string>>();
    con.host = this.comId;
    this.http.post(URL + '/concourses', con).subscribe((res: ApiResponse) => {
      subject.next([res.status, res.message]);
    });
    return subject;
  }

}
