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

  newFair(data): Subject<Array<any>> {
    const postData = new FormData();
    for (const key in data) {
      if (key === 'images') { continue; }
      postData.append(key, JSON.stringify(data[key]));
    }
    postData.append('logo', data.images.logo, 'fiar-logo');
    let id = 0;
    data.images.additional.forEach(additioanlImage => {
      postData.append('additional[]', additioanlImage, 'fair-additional' + id);
      id++;
    });
    const subject = new Subject<any>();
    this.http.post(URL + '/fair', postData).subscribe((res: ApiResponse) => {
      subject.next([res.status, res.data]);
    });
    return subject;
  }

  acceptCom(fair, apl, stand): Subject<string> {
    const subject = new Subject<string>();
    const data = {
      comId: apl.company._id,
      stand: stand,
    };
    this.http.post(URL + '/accept-com', data).subscribe((res: ApiResponse) => {
      subject.next(res.status);
      if (status === 'success') {
        apl.accepted = true;
      }
    });
    return subject;
  }

  rejectCom(fair, apl, commnet): Subject<string> {
    const subject = new Subject<string>();
    const data = {
      comId: apl.company._id,
      comment: commnet,
    };
    this.http.post(URL + '/reject-com', data).subscribe((res: ApiResponse) => {
      subject.next(res.status);
      if (status === 'success') {
        apl.rejected = true;
      }
    });
    return subject;
  }

}
