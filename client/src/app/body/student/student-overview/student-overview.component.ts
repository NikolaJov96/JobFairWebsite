import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavProviderService } from 'src/app/header/nav-provider.service';
import { StudentStatusService } from '../student-status.service';
import { Router } from '@angular/router';
import { Industry, JobType, CompanyConcoursesEntity } from 'src/app/interfaces';

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

  companies: Array<CompanyConcoursesEntity>;
  companiesFiltered: Array<CompanyConcoursesEntity>;
  selectedCom: CompanyConcoursesEntity = null;
  workingIn: CompanyConcoursesEntity = null;
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
    this.studentStatusService.getCompanies().subscribe(
      (status => {
        this.companies = status;
        this.companiesFiltered = this.companies;
      })
    );
    this.workingIn = this.studentStatusService.getWorikingIn();

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
      if (comName !== null && !com.com.name.toLowerCase().includes(comName.toLowerCase())) {
        return;
      }
      const comCopy = Object.assign({}, com);
      comCopy.com.concourses = [];
      this.companiesFiltered.push(comCopy);
      com.com.concourses.forEach(con => {
        if (type !== null && !type.includes('' + con.jobType)) {
          return;
        }
        if (conName !== null && !con.name.toLowerCase().includes(conName.toLowerCase())) {
          return;
        }
        comCopy.com.concourses.push(con);
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
    while (conId !== this.companies[com_Id].com.concourses[con_Id]._id) {
      con_Id++;
    }
    this.studentStatusService.setCon(this.companies[com_Id].com.concourses[con_Id]);
    this.router.navigate(['/student/concourse']);
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

  getIndustry(id) {
    let name = '';
    this.industries.forEach(ind => {
      if (ind._id === id) {
        name = ind.name;
      }
    });
    return name;
  }

}
