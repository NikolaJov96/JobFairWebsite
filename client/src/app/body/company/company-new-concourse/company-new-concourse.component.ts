import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyStatusService } from '../company-status.service';
import { JobType, ConcourseEntity } from 'src/app/interfaces';
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
  Cons: ConcourseEntity[] = null;
  message = 'Add new open position!';

  constructor(private companyStatusService: CompanyStatusService,
    private navProviderService: NavProviderService,
    private router: Router) { }

  ngOnInit() {
    this.navProviderService.getJobTypes().subscribe(
      (status => {
        this.jobTypes = status;
      })
    );
    this.companyStatusService.getCons().subscribe(
      (status => {
        this.Cons = status;
      })
    );
  }

  onCreate() {
    const con: ConcourseEntity = {
      _id: '',
      name: this.concourseForm.value.name,
      description: this.concourseForm.value.text,
      concluded: false,
      host: '',
      jobType: this.concourseForm.value.jobType,
      applicants: [],
    };
    this.companyStatusService.createCon(con).subscribe(
      (status => {
        if (status[0] === 'success') {
          this.message = 'Position successfully created!';
          this.router.navigate(['.']);
        } else {
          this.message = 'Error: ' + status[1];
        }
      })
    );
  }

  conclude(conId: string) {
    this.companyStatusService.setSelectedCon(conId);
    this.router.navigate(['company/conclude']);
  }

}
