import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Industry, NavProviderService } from 'src/app/header/nav-provider.service';

interface CompanyTableRow {
  name: string;
  town: string;
  director: string;
  taxNumber: string;
  staff: string;
  email: string;
  website: string;
  industry: number;
}

@Component({
  selector: 'app-guest-overview',
  templateUrl: './guest-overview.component.html',
  styleUrls: ['./guest-overview.component.css']
})
export class GuestOverviewComponent implements OnInit {

  filterFrom = new FormGroup({
    name: new FormControl(),
    industry: new FormControl(),
    town: new FormControl(),
  });

  industries: Array<Industry> = [];
  companies: Array<CompanyTableRow>;
  companiesFiltered: Array<CompanyTableRow>;
  displayedColumns = [
    'name',
    'town',
    'director',
    'taxNumber',
    'staff',
    'email',
    'website',
    'industry',
  ];

  constructor(private navProviderService: NavProviderService) { }

  ngOnInit() {
    this.industries = this.navProviderService.getIndustries();
    this.companies = [
      {
        name: 'Com1',
        town: 'Tow1',
        director: 'Dir1',
        taxNumber: '1234',
        staff: '123',
        email: 'hi@com1.com',
        website: 'com1.com',
        industry: 0,
      },
      {
        name: 'Com2',
        town: 'Tow2',
        director: 'Dir2',
        taxNumber: '2345',
        staff: '234',
        email: 'hi@com2.com',
        website: 'com2.com',
        industry: 1,
      },
      {
        name: 'Com3',
        town: 'Tow3',
        director: 'Dir3',
        taxNumber: '3456',
        staff: '345',
        email: 'hi@com3.com',
        website: 'com3.com',
        industry: 3,
      },
    ];
    this.companiesFiltered = this.companies;
  }

  onFilter() {
    const name = this.filterFrom.value.name;
    const industry = this.filterFrom.value.industry;
    const town = this.filterFrom.value.town;

    this.companiesFiltered = [];
    this.companies.forEach(com => {
      if (name !== null && !com.name.includes(name)) {
        return;
      }
      if (industry !== null && !industry.includes('' + com.industry)) {
        return;
      }
      if (town !== null && !com.town.includes(town)) {
        return;
      }
      this.companiesFiltered.push(com);
    });
  }

  resetFrom() {
    setTimeout(() => {
      this.onFilter();
    }, 50);
  }

}
