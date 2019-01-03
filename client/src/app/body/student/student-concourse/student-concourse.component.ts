import { Component, OnInit } from '@angular/core';
import { NavProviderService, JobType } from 'src/app/header/nav-provider.service';
import { ConcourseEntity, StudentStatusService, CompanyEntity } from '../student-status.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-student-concourse',
  templateUrl: './student-concourse.component.html',
  styleUrls: ['./student-concourse.component.css']
})
export class StudentConcourseComponent implements OnInit {

  applyForm = new FormGroup({
    coverLetterType: new FormControl(),
    coverLetterText: new FormControl(),
  });

  com: CompanyEntity;
  con: ConcourseEntity;
  jobTypes: Array<JobType> = [];

  constructor(
    private navProviderService: NavProviderService,
    private studentStatusService: StudentStatusService,
    private router: Router) { }

  ngOnInit() {
    this.jobTypes = this.navProviderService.getJobTypes();
    this.com = this.studentStatusService.getCom();
    this.con = this.studentStatusService.getCon();
    if (this.con === null) {
      this.router.navigate(['/student/overview']);
    }
  }

  onApply() {

  }

}
