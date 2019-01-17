import { Injectable } from '@angular/core';
import { ConcourseEntity, CompanyConcoursesEntity, ApiResponse, URL, UserEntity, ConcourseUsersEntity } from 'src/app/interfaces';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentStatusService {

  selectedCom: CompanyConcoursesEntity;
  selectedCon: ConcourseEntity;
  comToExpamd: CompanyConcoursesEntity;
  workingIn: CompanyConcoursesEntity;
  validCV: boolean;
  student: UserEntity = null;

  constructor(private http: HttpClient) {
    this.selectedCon = null;
    this.comToExpamd = null;
    this.workingIn = null;
    this.validCV = false;
  }

  setStudent(student: UserEntity) {
    this.student = student;
  }

  getStudent(): UserEntity {
    return this.student;
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
    return this.selectedCon;
  }

  setCon(con: ConcourseEntity) {
    this.selectedCon = con;
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

  getCons(): Subject<Array<ConcourseEntity>> {
    const subject = new Subject<Array<ConcourseEntity>>();
    this.http.get(URL + '/concourses').subscribe((res: ApiResponse) => {
      if (res.status === 'success') {
        subject.next(res.data);
      } else {
        subject.next([]);
      }
    });
    return subject;
  }

  getConDetails(id: string): Subject<ConcourseUsersEntity> {
    const subject = new Subject<ConcourseUsersEntity>();
    const params = new HttpParams().append('conId', id);
    this.http.get(URL + '/concourses', { params: params }).subscribe((res: ApiResponse) => {
      if (res.status === 'success') {
        subject.next(res.data);
      } else {
        subject.next(null);
      }
    });
    return subject;
  }

  apply(body): Subject<Array<string>> {
    const subject = new Subject<Array<string>>();
    if (!this.student.stu.cvUploaded) {
      setTimeout(() => subject.next(['error', 'cv not uploaded']), 1000);
      return subject;
    }
    const pdf = body.pdf;
    const postData = new FormData();
    for (const key in body) {
      if (key === 'pdf' || key === 'coverLetterPdf') { continue; }
      postData.append(key, body[key]);
    }
    if (body.coverLetterPdf) {
      postData.append('pdf', pdf, 'cover-letter');
      postData.append('coverLetterPdf', 'pdf');
    } else {
      postData.append('coverLetterPdf', 'txt');
    }
    postData.append('conId', this.selectedCon._id);
    postData.append('studentId', this.student._id);
    this.http.post(URL + '/apply', postData).subscribe((res: ApiResponse) => {
      subject.next([res.status, res.message]);
    });
    return subject;
  }

  saveCV(cv): Subject<Array<string>> {
    const subject = new Subject<Array<string>>();
    const body = {
      cv: cv,
      studentId: this.student._id,
    };
    this.http.post(URL + '/cv', body).subscribe((res: ApiResponse) => {
      if (res.status === 'success') {
        this.student.stu.cv = body.cv;
        this.student.stu.cvUploaded = true;
      }
      subject.next([res.status, res.message]);
    });
    return subject;
  }

}
