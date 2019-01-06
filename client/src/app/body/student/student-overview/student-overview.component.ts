import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavProviderService } from 'src/app/header/nav-provider.service';
import { StudentStatusService } from '../student-status.service';
import { Router } from '@angular/router';
import { CompanyEntity, Industry, JobType } from 'src/app/interfaces';

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
  selectedCom: CompanyEntity = null;
  workingIn: CompanyEntity = null;
  industries: Array<Industry> = [];
  jobTypes: Array<JobType> = [];

  constructor(
    private navProviderService: NavProviderService,
    private studentStatusService: StudentStatusService,
    private router: Router) { }

  ngOnInit() {
    this.navProviderService.getIndustries().subscribe(
      (status => {
        this.industries = status;
      })
    );
    this.navProviderService.getJobTypes().subscribe(
      (status => {
        this.jobTypes = status;
      })
    );
    this.companies = this.studentStatusService.getCompanies();
    this.workingIn = this.studentStatusService.getWorikingIn();
    this.companiesFiltered = this.companies;

    this.selectedCom = this.studentStatusService.getComToExpand();
    this.studentStatusService.setComToExpand(null);
    this.studentStatusService.setCom(null);
    this.studentStatusService.setCon(null);
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

  onApply(comId: string, conId: string) {
    console.log(comId, conId);
    let com_Id = 0;
    while (comId !== this.companies[com_Id]._id) {
      com_Id++;
    }
    this.studentStatusService.setCom(this.companies[com_Id]);
    let con_Id = 0;
    while (conId !== this.companies[com_Id].concourses[con_Id]._id) {
      con_Id++;
    }
    this.studentStatusService.setCon(this.companies[com_Id].concourses[con_Id]);
    this.router.navigate(['/student/concourse']);
  }

}
