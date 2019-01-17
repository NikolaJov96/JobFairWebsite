import { Injectable } from '@angular/core';
import { UserEntity, ApiResponse, URL } from 'src/app/interfaces';
import { Subject } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminStatusService {

  admin = null;
  fair = null;

  constructor(private http: HttpClient) { }

  setAdmin(admin: UserEntity) {
    this.admin = admin;
  }

  getAdmin(): UserEntity {
    return this.admin;
  }

  getFair(): Subject<any> {
    const subject = new Subject<any>();
    this.http.get(URL + '/fair').subscribe((res: ApiResponse) => {
      if (res.status === 'success') {
        this.fair = res.data;
        subject.next(res.data);
      } else {
        subject.next(null);
      }
    });
    return subject;
  }

  getDeadlineDates(): Subject<Array<Date>> {
    const subject = new Subject<Array<Date>>();
    this.http.get(URL + '/deadlines').subscribe((res: ApiResponse) => {
      if (res.status === 'success') {
        subject.next(res.data);
      } else {
        subject.next(null);
      }
    });
    return subject;
  }

  updateDeadlines(data): Subject<any> {
    const subject = new Subject<any>();
    this.http.post(URL + '/deadlines', data).subscribe((res: ApiResponse) => {
      subject.next(res.status);
    });
    return subject;
  }

}
