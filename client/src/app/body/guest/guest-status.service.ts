import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ApiResponse } from 'src/app/interfaces';
import { StudentStatusService } from '../student/student-status.service';
import { CompanyStatusService } from '../company/company-status.service';
import { URL } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GuestStatusService {

  constructor(private http: HttpClient,
    private studentStatusService: StudentStatusService,
    private companyStatusService: CompanyStatusService) { }

  login(username, password) {
    const body = {
      username: username,
      password: password,
    };

    const subject: Subject<string> = new Subject();
    this.http.post(URL + '/login', body).subscribe((res: ApiResponse) => {
      switch (res.status) {
        case 'company':
          subject.next('company');
          this.companyStatusService.setCom(res.data);
          break;
        case 'studnet': subject.next('studnet'); break;
        case 'admin': subject.next('admin'); break;
        default: subject.next(res.status); break;
      }
    });

    return subject;
  }
}
