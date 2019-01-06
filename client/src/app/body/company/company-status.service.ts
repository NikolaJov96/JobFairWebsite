import { Injectable } from '@angular/core';
import { ConcourseEntity, ApiResponse } from 'src/app/interfaces';
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

  getFinishedCons(): Subject<Array<ConcourseEntity>> {
    const subject = new Subject<Array<ConcourseEntity>>();
    const params = new HttpParams().set('getApplicants', 'true');
    this.http.get(URL + '/finished-cons', { params: params }).subscribe((res: ApiResponse) => {
      if (res.status === 'success') {
        subject.next(res.data);
      } else {
        subject.next([]);
      }
    });
    return subject;
  }

}
