import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { CompanyStatusService } from '../company-status.service';
import { JobType, ConcourseEntity, ConcourseUsersEntity } from 'src/app/interfaces';
import { NavProviderService } from 'src/app/header/nav-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-new-concourse',
  templateUrl: './company-new-concourse.component.html',
  styleUrls: ['./company-new-concourse.component.css']
})
export class CompanyNewConcourseComponent implements OnInit {

  concourseForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
    toMin: new FormControl('', [Validators.required]),
    toHour: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
    jobType: new FormControl('', [Validators.required]),
  });

  jobTypes: Array<JobType> = [];
  cons: ConcourseUsersEntity[] = null;
  originalMessage = 'Add new open position!';
  message = this.originalMessage;

  constructor(private companyStatusService: CompanyStatusService,
    private navProviderService: NavProviderService,
    private router: Router) { }

  ngOnInit() {
    if (this.companyStatusService.getCom() == null) {
      this.router.navigate(['/guest/login']);
      return;
    }
    this.navProviderService.getJobTypes().subscribe(
      (status => {
        this.jobTypes = status;
      })
    );
    this.companyStatusService.getCons().subscribe(
      (status => {
        this.cons = status;
      })
    );
  }

  onCreate(formObj: NgForm) {
    const con: ConcourseEntity = {
      _id: '',
      name: this.concourseForm.value.name,
      description: this.concourseForm.value.text,
      toMin: this.concourseForm.value.toMin,
      toHour: this.concourseForm.value.toHour,
      toDate: this.concourseForm.value.toDate,
      concluded: false,
      host: '',
      jobType: this.concourseForm.value.jobType,
      applicants: [],
    };
    this.companyStatusService.createCon(con).subscribe(
      (status => {
        if (status[0] === 'success') {
          this.message = 'Position successfully created!';
          setTimeout(() => this.message = this.originalMessage, 5000);
          formObj.resetForm();
          this.ngOnInit();
        } else {
          this.message = 'Error: ' + status[1];
        }
      })
    );
  }

  conclude(con: ConcourseUsersEntity) {
    this.companyStatusService.setSelectedCon(con);
    this.router.navigate(['company/conclude']);
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
