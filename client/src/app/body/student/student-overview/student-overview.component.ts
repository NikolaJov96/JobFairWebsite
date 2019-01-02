import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavProviderService, Industry, JobType } from 'src/app/header/nav-provider.service';

interface ConcourseEntity {
  name: string;
  jobType: number;
}

interface CompanyEntity {
  name: string;
  town: string;
  director: string;
  taxNumber: string;
  staff: string;
  email: string;
  website: string;
  industry: number;
  concourses: Array<ConcourseEntity>;
}

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

  constructor(private navProviderService: NavProviderService) { }

  ngOnInit() {
    this.industries = this.navProviderService.getIndustries();
    this.jobTypes = this.navProviderService.getJobTypes();
    this.companies = [
      {
        name: 'Com1',
        town: 'Tow1',
        director: 'Dir1',
        taxNumber: '1234',
        staff: '123',
        email: 'hi@com1.com',
        website: 'www.com1.com',
        industry: 0,
        concourses: [
          {
            name: 'con1',
            jobType: 0,
          },
          {
            name: 'con2',
            jobType: 1,
          },
        ],
      },
      {
        name: 'Com2',
        town: 'Tow2',
        director: 'Dir2',
        taxNumber: '2345',
        staff: '234',
        email: 'hi@com2.com',
        website: 'www.com2.com',
        industry: 1,
        concourses: [
          {
            name: 'con1',
            jobType: 0,
          },
          {
            name: 'con2',
            jobType: 1,
          },
        ],
      },
      {
        name: 'Com3',
        town: 'Tow3',
        director: 'Dir3',
        taxNumber: '3456',
        staff: '345',
        email: 'hi@com3.com',
        website: 'www.com3.com',
        industry: 3,
        concourses: [
          {
            name: 'con1',
            jobType: 0,
          },
          {
            name: 'con2',
            jobType: 1,
          },
        ],
      },
    ];
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

}
