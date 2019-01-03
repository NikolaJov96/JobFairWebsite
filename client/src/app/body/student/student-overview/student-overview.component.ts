import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavProviderService, Industry, JobType } from 'src/app/header/nav-provider.service';
import { StudentStatusService, CompanyEntity } from '../student-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-overview',
  templateUrl: './student-overview.component.html',
  styleUrls: ['./student-overview.component.css']
})
export class StudentOverviewComponent implements OnInit {

  filterForm = new FormGroup({
    comName: new FormControl(),
    type: new FormControl(),
    conName: new FormControl(),
  });

  companies: Array<CompanyEntity>;
  companiesFiltered: Array<CompanyEntity>;
  industries: Array<Industry> = [];
  jobTypes: Array<JobType> = [];

  constructor(
    private navProviderService: NavProviderService,
    private studentStatusService: StudentStatusService,
    private router: Router) { }

  ngOnInit() {
    this.industries = this.navProviderService.getIndustries();
    this.jobTypes = this.navProviderService.getJobTypes();
    this.companies = this.studentStatusService.getCompanies();
    this.companiesFiltered = this.companies;
  }

  onFilter() {
    const comName = this.filterForm.value.comName;
    const type = this.filterForm.value.type;
    const conName = this.filterForm.value.conName;

    this.companiesFiltered = [];
    this.companies.forEach(com => {
      if (comName !== null && !com.name.includes(comName)) {
        return;
      }
      const comCopy = Object.assign({}, com);
      comCopy.concourses = [];
      this.companiesFiltered.push(comCopy);
      com.concourses.forEach(con => {
        if (type !== null && !type.includes('' + con.jobType)) {
          return;
        }
        if (conName !== null && !con.name.includes(conName)) {
          return;
        }
        comCopy.concourses.push(con);
      });
    });
  }

  resetFrom() {
    setTimeout(() => {
      this.onFilter();
    }, 50);
  }

  onApply(comId: number, conId: number) {
    this.studentStatusService.setCom(this.companies[comId]);
    this.studentStatusService.setCon(this.companies[comId].concourses[conId]);
    this.router.navigate(['/student/concourse']);
  }

}
