import { Component, OnInit } from '@angular/core';
import { NavProviderService } from 'src/app/header/nav-provider.service';
import { StudentStatusService } from '../student-status.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ConcourseEntity, JobType, CompanyConcoursesEntity } from 'src/app/interfaces';

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

  com: CompanyConcoursesEntity;
  con: ConcourseEntity;
  jobTypes: Array<JobType> = [];

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

  }

  onBack() {
    this.studentStatusService.setComToExpand(
      this.studentStatusService.getCom()
    );
    this.router.navigate(['student/overview-coms']);
  }

}
