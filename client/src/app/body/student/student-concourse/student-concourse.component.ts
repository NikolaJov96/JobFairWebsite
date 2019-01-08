import { Component, OnInit } from '@angular/core';
import { NavProviderService } from 'src/app/header/nav-provider.service';
import { StudentStatusService } from '../student-status.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ConcourseEntity, JobType, CompanyConcoursesEntity } from 'src/app/interfaces';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-student-concourse',
  templateUrl: './student-concourse.component.html',
  styleUrls: ['./student-concourse.component.css']
})
export class StudentConcourseComponent implements OnInit {

  applyForm = new FormGroup({
    coverLetterPdf: new FormControl(),
    coverLetterText: new FormControl(),
  });

  com: CompanyConcoursesEntity;
  con: ConcourseEntity;
  jobTypes: Array<JobType> = [];
  message = 'Apply to this concourse!';

  constructor(
    private navProviderService: NavProviderService,
    private studentStatusService: StudentStatusService,
    private router: Router) { }

  ngOnInit() {
    this.navProviderService.getJobTypes().subscribe(
      (status => {
        this.jobTypes = status;
      })
    );
    this.com = this.studentStatusService.getCom();
    this.con = this.studentStatusService.getCon();
    if (this.con === null) {
      this.router.navigate(['/student/overview']);
    }
  }

  onApply() {
    if (this.applyForm.invalid) { return; }
    const body = {
      coverLetterExtension: 'txt',
      content: this.applyForm.value.coverLetterText,
    };
    if (this.applyForm.value.coverLetterPdf) {
      body['coverLetterExtension'] = 'pdf';
      // constent: pdf file
    }
    this.studentStatusService.apply(body).subscribe(
      (status => {
        if (status[0] === 'success') {
          this.router.navigate(['student/overview-coms']);
        } else {
          this.message = status[1];
        }
      })
    );
  }

  onBack() {
    this.studentStatusService.setComToExpand(
      this.studentStatusService.getCom()
    );
    this.router.navigate(['student/overview-coms']);
  }

  getJobType(id) {
    let name = '';
    this.jobTypes.forEach(jt => {
      if (jt._id === id) {
        name = jt.name;
      }
    });
    return name;
  }

}
