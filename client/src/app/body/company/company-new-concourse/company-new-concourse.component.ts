import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyStatusService, ConcourseConc } from '../company-status.service';
import { JobType } from 'src/app/interfaces';
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
  finishedCons: ConcourseConc[] = null;

  constructor(private companyStatusService: CompanyStatusService,
    private navProviderService: NavProviderService,
    private router: Router) { }

  ngOnInit() {
    this.navProviderService.getJobTypes().subscribe(
      (status => {
        this.jobTypes = status;
      })
    );
    this.finishedCons = this.companyStatusService.getFinishedCons();
  }

  onCreate() {

  }

  conclude(conId: string) {
    let sel: ConcourseConc = null;
    this.finishedCons.forEach(con => {
      if (con.con._id === conId) {
        sel = con;
      }
    });
    this.companyStatusService.setSelectedCon(sel);
    this.router.navigate(['company/conclude']);
  }

}