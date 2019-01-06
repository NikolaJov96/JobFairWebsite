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
  });

  jobTypes: Array<JobType> = [];
  finishedCons: ConcourseEntity[] = null;

  constructor(private companyStatusService: CompanyStatusService,
    private navProviderService: NavProviderService,
    private router: Router) { }

  ngOnInit() {
    this.navProviderService.getJobTypes().subscribe(
      (status => {
        this.jobTypes = status;
      })
    );
    this.companyStatusService.getFinishedCons().subscribe(
      (status => {
        this.finishedCons = status;
      })
    );
  }

  onCreate() {

  }

  conclude(conId: string) {
    let sel: ConcourseEntity = null;
    this.finishedCons.forEach(con => {
      if (con._id === conId) {
        sel = con;
      }
    });
    this.companyStatusService.setSelectedCon(sel._id);
    this.router.navigate(['company/conclude']);
  }

}
