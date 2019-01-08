import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavProviderService } from 'src/app/header/nav-provider.service';
import { StudentStatusService } from '../student-status.service';
import { Router } from '@angular/router';
import { Industry, JobType, CompanyConcoursesEntity, ConcourseEntity, ConcourseUsersEntity, UserEntity } from 'src/app/interfaces';

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

  companies: Array<CompanyConcoursesEntity> = null;
  companiesFiltered: Array<CompanyConcoursesEntity> = null;
  concourses: Array<ConcourseEntity> = null;
  selectedCom: CompanyConcoursesEntity = null;
  workingIn: CompanyConcoursesEntity = null;
  industries: Array<Industry> = [];
  jobTypes: Array<JobType> = [];
  student: UserEntity;

  constructor(
    private navProviderService: NavProviderService,
    private studentStatusService: StudentStatusService,
    private router: Router) { }

  ngOnInit() {
    if (this.studentStatusService.getStudent() == null) {
      this.router.navigate(['/guest/login']);
      return;
    }
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
        this.onFilter();
      })
    );
    this.studentStatusService.getCons().subscribe(
      (status => {
        this.concourses = status;
        this.onFilter();
      })
    );
    this.student = this.studentStatusService.getStudent();
    this.workingIn = this.studentStatusService.getWorikingIn();

    this.selectedCom = this.studentStatusService.getComToExpand();
    this.studentStatusService.setComToExpand(null);
    this.studentStatusService.setCom(null);
    this.studentStatusService.setCon(null);
  }

  onFilter() {
    if (this.companies == null || this.concourses == null) { return; }

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
      this.concourses.forEach(con => {
        if (con.host !== comCopy._id) { return; }
        if (type !== null && !type.includes('' + con.jobType)) { return; }
        if (conName !== null && !con.name.toLowerCase().includes(conName.toLowerCase())) { return; }
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

  hasApplied(con: ConcourseEntity) {
    if (con == null) { return false; }
    for (let i = 0; i < con.applicants.length; i++) {
      if (con.applicants[i].student.includes(this.student._id)) {
        return true;
      }
    }
    return false;
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
