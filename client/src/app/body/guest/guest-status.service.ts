import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ApiResponse, URL } from 'src/app/interfaces';
import { StudentStatusService } from '../student/student-status.service';
import { CompanyStatusService } from '../company/company-status.service';
import { AdminStatusService } from '../admin/admin-status.service';

@Injectable({
  providedIn: 'root'
})
export class GuestStatusService {

  constructor(private http: HttpClient,
    private studentStatusService: StudentStatusService,
    private companyStatusService: CompanyStatusService,
    private adminStatusService: AdminStatusService) { }

  login(username: string, password: string) {
    const body = {
      username: username,
      password: password,
    };

    const subject: Subject<Array<string>> = new Subject();
    this.http.post(URL + '/login', body).subscribe((res: ApiResponse) => {
      switch (res.status) {
        case 'company':
          subject.next(['company', res.message]);
          this.companyStatusService.setCom(res.data);
          break;
        case 'student':
          subject.next(['student', res.message]);
          this.studentStatusService.setStudent(res.data);
          break;
        case 'admin':
          subject.next(['admin', res.message]);
          this.adminStatusService.setAdmin(res.data);
          break;
        default: subject.next([res.status, res.message]); break;
      }
    });

    return subject;
  }

  logout(): Subject<any> {
    const subject = new Subject<any>();
    this.http.post(URL + '/logout', {}).subscribe((res: ApiResponse) => {
      subject.next();
    });
    return subject;
  }

  changePass(username: string, password: string, newPass1: string, newPass2: string) {
    const body = {
      username: username,
      password: password,
      newPass1: newPass1,
      newPass2: newPass2,
    };

    const subject: Subject<Array<string>> = new Subject();
    this.http.post(URL + '/change-pass', body).subscribe((res: ApiResponse) => {
      subject.next([res.status, res.message]);
    });

    return subject;
  }

  register(data: any) {
    const image = data.image;
    const postData = new FormData();
    for (const key in data) {
      if (key === 'image') { continue; }
      postData.append(key, data[key]);
    }
    postData.append('image', image, data.username);
    const subject: Subject<Array<string>> = new Subject();
    this.http.post(URL + '/register', postData).subscribe((res: ApiResponse) => {
      subject.next([res.status, res.message]);
    });
    return subject;
  }

  getCompanies(): Subject<Array<any>> {
    const subject: Subject<Array<any>> = new Subject();
    const params = new HttpParams().set('getCons', 'false');
    this.http.get(URL + '/companies', { params: params }).subscribe((res: ApiResponse) => {
      subject.next([res.status, res.message, res.data]);
    });
    return subject;
  }

}
